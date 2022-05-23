const { rule } = require("postcss");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: true,
  theme: {
    extend: {
      keyframes: {
        pop: {
          '0%': { transform: 'scale(110%)' },
          '100%': { transform: 'scale(100%)' },
        }
      },
      animation: {
        add: 'pop .1s ease-in-out',
      }
    },
  },
  plugins: [],
}
