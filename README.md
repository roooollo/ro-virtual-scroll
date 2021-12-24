## 🖥 Environment Support

- Modern browsers
- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

<br>

## 📦 Install

```bash
npm install ro-virtual-scroll
```

## 🔨 Usage

Then add the component to your `react` app. For example:

**index.js**

```js
import React from 'react';
import faker from 'faker';
import RoVirtualScroller from 'ro-virtual-scroll';

const listData = new Array(500000).fill(null).map((item, index) => ({
  key: `_${index}`,
  value: `${index}_${faker.lorem.sentences()}`,
}));

export default function TestVirtual() {
  return (
    <RoVirtualScroller
      className="someclass"
      style={{ height: '500px', width: '400px' }}
      listData={listData}
      estimatedItemSize={50}
      render={(visibleData) =>
        visibleData.map((item) => (
          <div key={item.key} style={{ borderBottom: '1px solid black' }}>
            <div>{item.value}</div>
          </div>
        ))
      }
    />
  );
}
```
