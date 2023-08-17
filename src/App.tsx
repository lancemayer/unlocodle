import { GrowthBook } from "@growthbook/growthbook"
import { Component, createEffect, createSignal } from "solid-js"
import Game from "./components/Game"
import { InstructionsModal } from "./components/InstructionsModal"

export const growthbook = new GrowthBook({
	apiHost: "https://cdn.growthbook.io",
	clientKey: "sdk-80BUWbgk74xyoyAk",
	enableDevMode: true,
	trackingCallback: (experiment, result) => {
		// TODO: Use your real analytics tracking system
		console.log("Viewed Experiment", {
			experimentId: experiment.key,
			variationId: result.key,
		})
	},
	attributes: {
		id: localStorage.getItem("userId") || "",
	},
})

export const [theme, setTheme] = createSignal(localStorage.theme)
await growthbook.loadFeatures({ autoRefresh: true })

export const App: Component = () => {
	createEffect(() => {
		localStorage.theme = theme()

		if (
			(growthbook.isOn("theme-toggle") === true &&
				localStorage.theme === "dark") ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	})

	return (
		<>
			<InstructionsModal />
			<Game />
		</>
	)
}
