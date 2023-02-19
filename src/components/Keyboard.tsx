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
		<div class="absolute inset-x-0 bottom-0 mx-auto mb-2 w-[500] space-y-1">
			<For each={keyboard}>
				{(row) => (
					<div class="mx-auto w-max space-x-1">
						<For each={row}>
							{(key) => (
								<button
									className={`${
										key === "Enter" || key === "Delete"
											? "w-[65px]"
											: "w-[43px]"
									} h-[3.3rem] rounded-md bg-[#d3d6da] font-bold text-black focus:outline-none`}
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
