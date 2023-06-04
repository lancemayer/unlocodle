import * as dialog from "@zag-js/dialog"
import { normalizeProps, useMachine } from "@zag-js/solid"
import {
	Component,
	Show,
	createMemo,
	createSignal,
	createUniqueId,
} from "solid-js"
import { Portal } from "solid-js/web"

export const InstructionsModal: Component = () => {
	const showInstructionslocalStorage =
		localStorage.getItem("showInstructions") ?? "true"

	const [dontShowAgain, setDontShowAgain] = createSignal<boolean>(false)

	const [state, send] = useMachine(
		dialog.machine({
			id: createUniqueId(),
			open: showInstructionslocalStorage === "true",
			trapFocus: false,
			onClose: () => {
				if (dontShowAgain()) {
					localStorage.setItem("showInstructions", "false")
				}
			},
		})
	)

	const api = createMemo(() => dialog.connect(state, send, normalizeProps))

	console.log(api())

	const [showModal, setShowModal] = createSignal<boolean>(
		showInstructionslocalStorage === "true"
	)

	return (
		<Show when={api().isOpen}>
			<Portal>
				<div
					{...api().backdropProps}
					class="fixed left-0 top-0 h-screen w-full bg-black/50"
				/>
				<div
					{...api().containerProps}
					class="fixed inset-0 flex h-screen w-full items-center justify-center"
				>
					<div
						{...api().contentProps}
						class="h-[600px] max-h-screen w-[350px] overflow-auto rounded-lg bg-gray-950 p-8 drop-shadow-xl sm:h-[640px] sm:w-[520px]"
					>
						<h1
							{...api().titleProps}
							class="text-center text-2xl font-bold text-white"
						>
							What is UNLOCODLE?
						</h1>
						<div {...api().descriptionProps}>
							<div class="text-white">
								It is a hot new Wordle parody that no one asked for and is
								causing people to say things like "I can't believe this is...a
								thing" and "I'm not sure if I should be impressed or horrified"
								and "Why...just...why?".
							</div>
							<div class="mt-4 text-white">
								The most common way to play is to not. However, if you insist,
								here are the rules:
							</div>
							<div class="text-white">
								The goal is to find the correct UNLOCODE in six guesses. Each
								guess must be a valid US-based UNLOCODE. After submitting a
								guess you will be given feedback on how many of your letters are
								in the correct position and how many are in the wrong position.
							</div>
							<div class="mt-4 text-white">
								Letters in the correct position show with a green background.
								Letters that are in the wrong position show with a yellow
								background. Letters that are not in the solution show with a
								gray background.
							</div>
							<div>
								<div class="m-1 inline-block h-12 w-12 rounded-md bg-[green] text-white">
									<div class="flex h-full w-full items-center justify-center">
										U
									</div>
								</div>
								<div class="m-1 inline-block h-12 w-12 rounded-md bg-[green] text-white">
									<div class="flex h-full w-full items-center justify-center">
										S
									</div>
								</div>
								<div class="m-1 inline-block h-12 w-12 rounded-md bg-[#b59f3b] text-white">
									<div class="flex h-full w-full items-center justify-center">
										L
									</div>
								</div>
								<div class="m-1 inline-block h-12 w-12 rounded-md bg-[gray] text-white">
									<div class="flex h-full w-full items-center justify-center">
										A
									</div>
								</div>
								<div class="m-1 inline-block h-12 w-12 rounded-md bg-[gray] text-white">
									<div class="flex h-full w-full items-center justify-center">
										X
									</div>
								</div>
							</div>
							<div class="flex flex-row-reverse">
								<div class="flex items-center">
									<div class="mr-4 flex items-center">
										<label for="dismiss-instructions" class="mr-2 text-white">
											Don't show again
										</label>
										<input
											id="dismiss-instructions"
											type="checkbox"
											checked={dontShowAgain()}
											onChange={() => setDontShowAgain(!dontShowAgain())}
										/>
									</div>
									<button
										{...api().closeTriggerProps}
										class="mt-3 h-8  w-16 rounded-full bg-white hover:bg-gray-200"
										// onClick={() => {
										// 	if (dontShowAgain()) {
										// 		localStorage.setItem("showInstructions", "false")
										// 	}
										// 	setShowModal(false)
										// }}
									>
										<div>Close</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	)
}
