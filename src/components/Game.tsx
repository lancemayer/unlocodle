import {
	Component,
	createComputed,
	createEffect,
	createSignal,
	For,
	onCleanup,
	onMount,
	Show,
} from "solid-js"
import toast, { Toaster } from "solid-toast"
import { z } from "zod"
import { unlocodes } from "../unlocodes"
import { Cell } from "./Cell"
import { Keyboard } from "./Keyboard"
import { ThemeSwitcher } from "./ThemeSwitcher"

const guessesSchema = z.object({
	value: z.string(),
	status: z.enum(["no_match", "exists", "match"]),
})

type CellInfo = z.infer<typeof guessesSchema>

export type CellStatus = z.infer<typeof guessesSchema>["status"]

export const [guessedLetterResults, setGuessedLetterResults] = createSignal<
	Map<string, "no_match" | "exists" | "match">
>(new Map())

const Game: Component = () => {
	if (!localStorage.solution) {
		localStorage.solution =
			unlocodes[Math.floor(Math.random() * unlocodes.length)]
	}
	const solution = localStorage.solution

	const [gameResult, setGameResult] = createSignal<
		"unfinished" | "win" | "loss"
	>("unfinished")

	const totalGuesses = 6
	const [guess, setGuess] = createSignal("")

	const [guessAnimating, setGuessAnimating] = createSignal(false)
	const [rowShake, setRowShake] = createSignal(false)

	let storedData: CellInfo[][]

	const result = guessesSchema
		.array()
		.array()
		.safeParse(JSON.parse(localStorage.getItem("guesses") || "[]"))

	if (!result.success) {
		storedData = []
	} else {
		storedData = result.data
	}

	const [committedGuesses, setCommittedGuesses] =
		createSignal<CellInfo[][]>(storedData)

	createEffect(() => {
		setGuessedLetterResults(
			committedGuesses()
				.flat()
				.sort((a, b) => (a.status === "exists" ? -1 : 1))
				.reduce((accumulator, currentValue) => {
					accumulator.set(currentValue.value, currentValue.status)
					return accumulator
				}, new Map())
		)
	})

	createComputed(() => {
		const mostRecentGuess = committedGuesses()
			.at(-1)
			?.map((c) => c.value)
			.join("")

		if (mostRecentGuess === solution) {
			setGameResult("win")
			setTimeout(
				() =>
					toast(
						(t) => (
							<div class="flex flex-col items-center">
								<div class="text-2xl font-bold">You win!</div>
								<div class="text-xl">The solution was {solution}</div>
								<button
									class="mt-4 rounded-md bg-gray-200 px-4 py-2"
									onClick={() => {
										localStorage.removeItem("solution")
										localStorage.removeItem("guesses")
										window.location.reload()
									}}
								>
									Play again
								</button>
							</div>
						),
						{ duration: Infinity, position: "top-center" }
					),
				1000
			)
		} else if (committedGuesses().length === 6) {
			setGameResult("loss")
			toast(
				(t) => (
					<div class="flex flex-col items-center">
						<div class="text-2xl font-bold">You lose</div>
						<div class="text-xl">The solution was {solution}</div>
						<button
							class="mt-4 rounded-md bg-gray-200 px-4 py-2"
							onClick={() => {
								localStorage.removeItem("solution")
								localStorage.removeItem("guesses")
								window.location.reload()
							}}
						>
							Play again
						</button>
					</div>
				),
				{ duration: Infinity, position: "top-center" }
			)
		}
	})

	createEffect(() => {
		localStorage.setItem("guesses", JSON.stringify(committedGuesses()))
	})

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.repeat || guessAnimating()) {
			return
		}
		if (e.key === "Backspace") {
			deleteLetter()
		} else if (e.key === "Enter") {
			e.preventDefault()
			enterGuess()
		} else if (
			/^[a-z0-9]$/.test(e.key.toLowerCase()) &&
			!(e.metaKey || e.ctrlKey)
		) {
			inputLetter(e.key.toUpperCase())
		}
	}

	onMount(() => {
		document.addEventListener("keydown", handleKeyPress)
		document.addEventListener("animationstart", startAnimation)
		document.addEventListener("animationend", endAnimation)

		onCleanup(() => {
			document.removeEventListener("keydown", handleKeyPress)
			document.removeEventListener("animationstart", startAnimation)
			document.removeEventListener("animationend", endAnimation)
		})
	})

	let revealAnimations: Animation[] | null = null

	function startAnimation(e: AnimationEvent) {
		if (e.animationName.startsWith("reveal-")) {
			if (revealAnimations === null) {
				setGuessAnimating(true)
				revealAnimations = document.getAnimations()
			} else {
				return
			}

			revealAnimations?.forEach((a) => {
				a.finished.then(() => {
					if (revealAnimations?.every((a) => a.playState === "finished")) {
						setGuessAnimating(false)
						revealAnimations = null
					}
				})
			})
		}
	}

	function endAnimation(e: AnimationEvent) {
		if (e.animationName === "shake-horizontal") {
			setRowShake(false)
		}
	}

	const deleteLetter = () => {
		setGuess(guess().slice(0, guess().length - 1))
	}

	const enterGuess = () => {
		if (gameResult() !== "unfinished" || guessAnimating()) {
			return
		}

		if (guess().length < 5) {
			toast("Guess must be 5 letters long", { position: "top-center" })
			return
		}

		if (guess().length === 5 && committedGuesses().length < 6) {
			let remainingLetters = Array.from(solution)

			let guessColored: CellInfo[] = Array.from(guess()).map((letter) => {
				return {
					value: letter,
					status: "no_match",
				}
			})

			for (let i = 0; i < 5; i++) {
				if (guess()[i] === solution[i]) {
					guessColored[i].status = "match"
					remainingLetters[i] = ""
				}
			}
			for (let i = 0; i < 5; i++) {
				if (
					remainingLetters[i] !== "" &&
					remainingLetters.includes(guess()[i])
				) {
					guessColored[i].status = "exists"
				}
			}

			if (!unlocodes.includes(guess())) {
				setRowShake(true)
				toast("Invalid unlocode option", { position: "top-center" })

				return
			}

			setCommittedGuesses([...committedGuesses(), guessColored])
			setGuess("")
		}
	}

	const inputLetter = (letter: string) => {
		if (
			guess().length < 5 &&
			committedGuesses().length < 6 &&
			gameResult() === "unfinished"
		) {
			setGuess(guess() + letter)
		}
	}

	return (
		<>
			<div class="flex h-16 items-center border-b-2 border-gray-300 dark:border-gray-600">
				<h1 class="text grow text-center font-serif text-3xl font-extrabold tracking-wide text-black dark:text-white">
					UNLOCODLE
				</h1>
				<div class="absolute right-4">
					<div class="flex space-x-2 align-middle">
						<ThemeSwitcher />
						<Show when={import.meta.env.DEV && true}>
							<button
								class="text-black dark:text-white"
								onClick={() => {
									localStorage.setItem("guesses", "[]")
									localStorage.removeItem("solution")
									location.reload()
								}}
							>
								Reset
							</button>
						</Show>
					</div>
				</div>
			</div>
			<div class="mx-auto flex w-full max-w-[500px] flex-col">
				<div class="flex flex-col">
					<div class="flex grow justify-center overflow-hidden align-middle">
						<div class="grid grid-rows-6 gap-y-1.5 p-2.5">
							<For each={committedGuesses()}>
								{(guess) => (
									<div class="grid max-w-lg grid-cols-5 gap-x-1.5">
										<For each={Array.from(guess)}>
											{(cell, index) => (
												<Cell status={cell.status} index={index()}>
													{cell.value}
												</Cell>
											)}
										</For>
									</div>
								)}
							</For>

							<Show when={committedGuesses().length < totalGuesses}>
								<div
									class={`grid max-w-lg grid-cols-5 gap-x-1.5 ${
										rowShake() ? "animate-shake" : ""
									}`}
								>
									<For each={Array.from(guess())}>
										{(guess) => <Cell>{guess}</Cell>}
									</For>
									<For each={Array(5 - guess().length)}>
										{() => <Cell></Cell>}
									</For>
								</div>
								<For each={Array(5 - committedGuesses().length)}>
									{() => (
										<div hidden class="grid max-w-lg grid-cols-5 gap-x-1.5">
											<For each={Array(5)}>{() => <Cell></Cell>}</For>
										</div>
									)}
								</For>
							</Show>
						</div>
					</div>
				</div>
				<div class="max-sm:absolute max-sm:inset-x-0 max-sm:bottom-2">
					<Keyboard
						enterGuess={enterGuess}
						deleteLetter={deleteLetter}
						inputLetter={inputLetter}
					/>
				</div>
			</div>
			<Toaster containerClassName="mt-16" />
		</>
	)
}

export default Game
