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
			class={`transition ease-in-out delay-[${delay().toString()}ms] duration-[0ms] animate-reveal-none:bg-red-300 flex items-center justify-center text-3xl
     font-extrabold rounded-md h-16 w-16 border-2
     ${
				animationStatus() === "add"
					? "border-gray-400 animate-add"
					: animationStatus() === "reveal"
					? color() === "match"
						? "animate-reveal-match"
						: color() === "exists"
						? "animate-reveal-exists"
						: "animate-reveal-none"
					: "border-[#d3d6da]"
			}`}
			style={{ "animation-delay": delay() + "ms" }}
		>
			{c()}
		</div>
	)
}

export default Cell
