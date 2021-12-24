module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  plugins: ["react", "react-hooks", "babel"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-empty": "warn",
    "no-cond-assign": ["error", "always"],
    "for-direction": "off",
  },
  extends: ["prettier"],
};
