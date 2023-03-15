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
		c() === undefined ? "idle" : props.status == undefined ? "add" : "reveal"

	return (
		<div
			class={`flex h-14 w-14 items-center justify-center rounded-md border-2
     border-gray-300 text-3xl font-extrabold text-black dark:border-gray-600 dark:text-white sm:h-16 sm:w-16
     ${
				animationStatus === "add" &&
				"animate-add border-gray-400 dark:border-gray-500"
			}
	 ${
			animationStatus === "reveal" &&
			props.status === "match" &&
			"animate-reveal-match"
		}
	 ${
			animationStatus === "reveal" &&
			props.status === "exists" &&
			"animate-reveal-exists"
		}
	 ${
			animationStatus === "reveal" &&
			props.status === "no_match" &&
			"animate-reveal-none"
		}
		`}
			style={{ "animation-delay": delay + "ms" }}
		>
			{c()}
		</div>
	)
}
