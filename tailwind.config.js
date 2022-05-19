const { rule } = require("postcss");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: true, // or 'media' or 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
