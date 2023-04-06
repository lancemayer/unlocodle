import { createEffect, createSignal, For } from "solid-js"
import { theme } from "../App"
import { guessedLetterResults } from "./Game"

export const Keyboard = (props: {
	enterGuess: () => void
	deleteLetter: () => void
	inputLetter: (letter: string) => void
}) => {
	const keyboard: string[][] = [
		["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
	]

	const [keyboardState, setKeyboardState] = createSignal<
		{ key: string; state: string }[][]
	>(
		keyboard.map((row) =>
			row.map((key) => ({ key, state: "bg-gray-300 dark:bg-gray-500" }))
		)
	)

	const bgColors = new Map<"no_match" | "exists" | "match", string>([
		["no_match", "bg-gray-500"],
		["exists", "bg-[#b59f3b]"],
		["match", "bg-[green]"],
	])

	const darkBgColors = new Map<"no_match" | "exists" | "match", string>([
		["no_match", "dark:bg-gray-700"],
		["exists", "dark:bg-[#b59f3b]"],
		["match", "dark:bg-[green]"],
	])

	createEffect(() => {
		guessedLetterResults().forEach((value, key) => {
			setKeyboardState((prev) => {
				const newState = prev.map((row) => {
					return row.map((keyState) => {
						if (keyState.key === key) {
							return {
								...keyState,
								state: `${bgColors.get(value)} ${
									theme() === "dark" ? darkBgColors.get(value) : ""
								}`,
							}
						} else {
							return keyState
						}
					})
				})
				return newState
			})
		})
	})

	return (
		<div class="mx-2">
			<For each={keyboardState()}>
				{(row) => (
					<div class="mb-1.5 flex justify-center space-x-1.5">
						<For each={row}>
							{(key) => {
								return (
									<button
										class={`${
											key.key === "Enter" || key.key === "Delete"
												? "w-16"
												: "w-9"
										} h-[3.3rem] rounded-md ${
											key.state
										} font-bold text-black focus:outline-none dark:text-white`}
										onClick={() => {
											if (key.key === "Enter") {
												props.enterGuess()
											} else if (key.key === "Delete") {
												props.deleteLetter()
											} else {
												props.inputLetter(key.key)
											}
										}}
									>
										{key.key}
									</button>
								)
							}}
						</For>
					</div>
				)}
			</For>
		</div>
	)
}
