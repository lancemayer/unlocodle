import { Component, Show } from "solid-js"
import { setTheme, theme } from "../App"
import { DarkIcon } from "./DarkIcon"
import { LightIcon } from "./LightIcon"

export const ThemeSwitcher: Component = () => {
	return (
		<button
			class="text-black dark:text-white"
			onClick={() => {
				setTheme((prev) => (prev === "dark" ? "light" : "dark"))
			}}
		>
			<Show when={theme() === "dark"} fallback={<DarkIcon />}>
				<LightIcon />
			</Show>
		</button>
	)
}
