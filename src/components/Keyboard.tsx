import { For } from "solid-js"

const Keyboard = ({
	enterGuess,
	deleteLetter,
	inputLetter,
}: {
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

	return (
		<div class="mx-2">
			<For each={keyboard}>
				{(row) => (
					<div class="mb-1.5 flex justify-center space-x-1.5">
						<For each={row}>
							{(key) => (
								<button
									class={`${
										key === "Enter" || key === "Delete" ? "w-16" : "w-9"
									} h-[3.3rem] rounded-md bg-gray-300 font-bold text-black focus:outline-none dark:bg-gray-500 dark:text-white`}
									onClick={() => {
										if (key === "Enter") {
											enterGuess()
										} else if (key === "Delete") {
											deleteLetter()
										} else {
											inputLetter(key)
										}
									}}
								>
									{key}
								</button>
							)}
						</For>
					</div>
				)}
			</For>
		</div>
	)
}

export default Keyboard
