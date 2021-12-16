import React, { useState, useMemo, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import './style.css';

export default function RoVirtualScroller(props) {
  // 数据源 默认行高 render_props
  const { listData, estimatedItemSize, render } = props;
  const [curState, setCurState] = useState({
    positions: listData.map((item, index) => ({
      index,
      height: estimatedItemSize,
      top: index * estimatedItemSize,
      bottom: (index + 1) * estimatedItemSize,
      // onSet: false, // 已缓存
    })),
    screenHeight: 0,
    start: 0,
    end: null,
    bufferScale: 1, // 视窗顶底缓冲阈值
  });
  const containerRef = useRef();
  const phantomRef = useRef();
  const listRef = useRef();

  const visibleCount = useCallback(() => Math.ceil(curState.screenHeight / estimatedItemSize), [curState.screenHeight]);
  // 上缓冲
  const aboveCount = useMemo(() => Math.min(curState.start, curState.bufferScale * visibleCount()), [curState.start]);
  // 下缓冲
  const belowCount = useMemo(
    () => Math.min(listData.length - curState.end, curState.bufferScale * visibleCount()),
    [curState.end],
  );
  // 呈现数据
  const visibleData = useMemo(
    () => listData.slice(curState.start - aboveCount, curState.end + belowCount),
    [curState.start, curState.end],
  );

  // 上偏移（受缓冲区影响）
  const setStartOffset = () => {
    let startOffset;
    if (curState.start >= 1) {
      // 计算缓冲区上边距
      const aboveTop = curState.positions[curState.start - aboveCount];
      const aboveArea = aboveTop ? aboveTop.top : 0;
      const size = curState.positions[curState.start].top - aboveArea;
      // 减去缓冲区上边距
      startOffset = curState.positions[curState.start - 1].bottom - size;
    } else {
      startOffset = 0;
    }
    listRef.current.style.transform = `translate3d(0,${startOffset}px,0)`;
  };

  // 二分法查找
  const binarySearch = (list, value) => {
    let start = 0;
    let end = list.length - 1;
    let tempIndex = null;
    while (start <= end) {
      const midIndex = parseInt((start + end) / 2, 10);
      const midValue = list[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else if (midValue > value) {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end -= 1;
      }
    }
    return tempIndex;
  };

  // 获取当前节点下标
  const getStartIndex = (scrollTop = 0) => binarySearch(curState.positions, scrollTop);

  // 获取列表项的当前尺寸
  const updateItemsSize = () => {
    const nodes = Array.from(listRef.current.children);
    nodes.forEach((node, index) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const height = rect.height;
      // if (!curState.positions[index].onSet) {
      //   curState.positions[index].onSet = true;
      // } else {
      //   // 缓存后不再检索
      //   return;
      // }
      const oldHeight = curState.positions[index].height;
      const dValue = oldHeight - height;
      // 存在差值
      if (dValue) {
        curState.positions[index].bottom = curState.positions[index].bottom - dValue;
        curState.positions[index].height = height;
        for (let k = index + 1; k < curState.positions.length; k++) {
          curState.positions[k].top = curState.positions[k - 1].bottom;
          curState.positions[k].bottom = curState.positions[k].bottom - dValue;
        }
      }
    });
  };

  const scrollEvent = (e) => {
    // 当前滚动位置
    const scrollTop = containerRef.current.scrollTop;
    // 此时的开始索引
    curState.start = getStartIndex(scrollTop);
    // 此时的结束索引
    curState.end = curState.start + visibleCount();
    // 此时的偏移量
    setStartOffset();
    setCurState({ ...curState });
  };

  useLayoutEffect(() => {
    curState.screenHeight = containerRef.current.clientHeight;
    curState.start = 0;
    curState.end = curState.start + visibleCount();
    setCurState({ ...curState });
  }, []);

  useEffect(() => {
    if (!listRef.current.children.length) {
      return;
    }
    // 获取真实元素大小，修改对应的尺寸缓存
    updateItemsSize();
    // 更新列表总高度
    const height = curState.positions[curState.positions.length - 1].bottom;
    phantomRef.current.style.height = `${height}px`;
    // 更新真实偏移量
    setStartOffset();
  });

  return (
    <div style={props.style} className={props.className}>
      <div ref={containerRef} className="infinite-list-container" onScroll={scrollEvent}>
        <div ref={phantomRef} className="infinite-list-phantom" />
        <div ref={listRef} className="infinite-list">
          {render(visibleData)}
        </div>
      </div>
    </div>
  );
}
