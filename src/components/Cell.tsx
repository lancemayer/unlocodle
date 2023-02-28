import { children, createEffect, createSignal, JSX } from "solid-js"

const Cell = (props: {
	color?: string
	reveal?: boolean
	index?: number
	children?: JSX.Element
}) => {
	const c = children(() => props.children)
	const color = children(() => props.color)
	const reveal = children(() => props.reveal)
	const index = children(() => props.index)
	const [delay, setDelay] = createSignal(0)

	const [animationStatus, setAnimationStatus] = createSignal<
		"idle" | "add" | "reveal"
	>("idle")
	createEffect(() => {
		setDelay(reveal() && index() ? (index() as number) * 100 : 0)
		setAnimationStatus(
			c() === undefined ? "idle" : color() == null ? "add" : "reveal"
		)
	})
	return (
		<div
			class={`transition ease-in-out delay-[${delay().toString()}ms] flex h-14 w-14 items-center justify-center rounded-md border-2
     text-3xl font-extrabold text-black duration-[0ms] dark:text-white sm:h-16 sm:w-16
     ${
				animationStatus() === "add"
					? "animate-add border-gray-400"
					: animationStatus() === "reveal"
					? color() === "match"
						? "animate-reveal-match"
						: color() === "exists"
						? "animate-reveal-exists"
						: "animate-reveal-none"
					: "border-gray-300 dark:border-gray-600"
			}`}
			style={{ "animation-delay": delay() + "ms" }}
		>
			{c()}
		</div>
	)
}

export default Cell
