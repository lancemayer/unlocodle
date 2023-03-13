import { children, JSX } from "solid-js"
import { CellStatus } from "../App"

export const Cell = (props: {
	status?: CellStatus
	index?: number
	children?: JSX.Element
}) => {
	const c = children(() => props.children)
	const delay = props.index ? (props.index as number) * 175 : 0
	const animationStatus =
		c() === undefined ? "idle" : props.status == null ? "add" : "reveal"

	return (
		<div
			class={`flex h-14 w-14 items-center justify-center rounded-md border-2
     text-3xl font-extrabold text-black dark:text-white sm:h-16 sm:w-16
     ${
				animationStatus === "add"
					? "animate-add border-gray-400"
					: animationStatus === "reveal"
					? props.status === "match"
						? "animate-reveal-match"
						: props.status === "exists"
						? "animate-reveal-exists"
						: "animate-reveal-none"
					: "border-gray-300 dark:border-gray-600"
			}`}
			style={{ "animation-delay": delay + "ms" }}
		>
			{c()}
		</div>
	)
}
