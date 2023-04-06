import { Component, createEffect, createSignal } from "solid-js"
import Game from "./components/Game"

export const [theme, setTheme] = createSignal(localStorage.theme)

const App: Component = () => {
	createEffect(() => {
		localStorage.theme = theme()

		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	})

	return <Game />
}

export default App
