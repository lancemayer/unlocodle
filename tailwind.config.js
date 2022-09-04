const { rule } = require("postcss");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: true,
  theme: {
    extend: {
      keyframes: {
        pop: {
          "0%": { transform: "scale(100%)" },
          "50%": { transform: "scale(110%)" },
          "100%": { transform: "scale(100%)" },
        },
        "flip-match": {
          "0%": {
            transform: "rotateX(0deg)",
            backgroundColor: "white",
            borderColor: "gray",
            color: "black",
          },
          "50%": {
            transform: "rotateX(90deg)",
            backgroundColor: "white",
            borderColor: "gray",
            color: "black",
          },
          "51%": {
            transform: "rotateX(90deg)",
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
          },
          "100%": {
            transform: "rotateX(0deg)",
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
          },
        },
        "flip-exists": {
          "0%": {
            transform: "rotateX(0deg)",
            backgroundColor: "white",
            color: "black",
          },
          "50%": {
            transform: "rotateX(90deg)",
            backgroundColor: "white",
            color: "black",
          },
          "51%": {
            transform: "rotateX(90deg)",
            backgroundColor: "#ffe135",
            borderColor: "#ffe135",
            color: "white",
          },
          "100%": {
            transform: "rotateX(0deg)",
            backgroundColor: "#ffe135",
            borderColor: "#ffe135",
            color: "white",
          },
        },
        "flip-none": {
          "50%": {
            transform: "rotateX(90deg)",
            backgroundColor: "gray",
            borderColor: "gray",
            color: "white",
          },
          "100%": {
            transform: "rotateX(0deg)",
            backgroundColor: "gray",
            borderColor: "gray",
            color: "white",
          },
        },
      },
      animation: {
        add: "pop .1s ease-in-out",
        "reveal-match": "flip-match .5s ease-in-out forwards",
        "reveal-exists": "flip-exists .5s ease-in-out forwards",
        "reveal-none": "flip-none .5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
