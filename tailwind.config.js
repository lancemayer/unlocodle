const { rule } = require("postcss")

module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			keyframes: {
				pop: {
					"0%": { transform: "scale(100%)" },
					"50%": { transform: "scale(110%)" },
					"100%": { transform: "scale(100%)" },
				},
				"reveal-match": {
					"0%": {
						transform: "rotateX(0deg)",
						backgroundColor: "transparent",
					},
					"50%": {
						transform: "rotateX(90deg)",
						backgroundColor: "transparent",
					},
					"51%": {
						transform: "rotateX(90deg)",
						backgroundColor: "green",
						color: "white",
					},
					"100%": {
						transform: "rotateX(0deg)",
						backgroundColor: "green",
						borderColor: "green",
						color: "white",
					},
				},
				"reveal-exists": {
					"0%": {
						transform: "rotateX(0deg)",
						backgroundColor: "transparent",
					},
					"50%": {
						transform: "rotateX(90deg)",
						backgroundColor: "transparent",
					},
					"51%": {
						transform: "rotateX(90deg)",
						backgroundColor: "#ffe135",
						color: "white",
					},
					"100%": {
						transform: "rotateX(0deg)",
						backgroundColor: "#ffe135",
						borderColor: "#ffe135",
						color: "white",
					},
				},
				"reveal-none": {
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
				"shake-horizontal": {
					"20%": {
						transform: "translateX(-5px)",
					},
					"40%": {
						transform: "translateX(5px)",
					},
					"60%": {
						transform: "translateX(-5px)",
					},
					"80%": {
						transform: "translateX(5px)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
			},
			animation: {
				add: "pop .2s ease-in-out",
				"reveal-match": "reveal-match .8s ease-in-out forwards",
				"reveal-exists": "reveal-exists .8s ease-in-out forwards",
				"reveal-none": "reveal-none .8s ease-in-out forwards",
				shake: "shake-horizontal .25s ease-in-out",
			},
		},
	},
}
