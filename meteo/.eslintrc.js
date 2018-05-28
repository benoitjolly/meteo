module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-param-reassign": ["error", { props: false }],
    "quotes": ["error", "single"],
    "max-len": ["error", { "code": 200 }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};