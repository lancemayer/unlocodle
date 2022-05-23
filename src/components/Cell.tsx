import { children, createEffect, createSignal, JSX } from "solid-js";

const Cell = (props: { color?: string, children?: JSX.Element }) => {
  const c = children(() => props.children);
  const color = children(() => props.color);
  const [animationStatus, setAnimationStatus] = createSignal<"idle" | "add" | "reveal">("idle");
  createEffect(() => {
    console.log("color", color());
    setAnimationStatus(c() === undefined ? "idle" : color() == null ? "add" : "reveal");
  })
  return (
    <div class={`${color() != null ? (color() === "match" ? "bg-green-500" : color() === "exists" ? "bg-yellow-300" : "bg-gray-400") : ""} flex items-center justify-center text-3xl font-extrabold rounded-md h-16 w-16 border-2  ${animationStatus() === "add" ? "border-gray-400 animate-add" : "border-[#d3d6da]"}`}>{c()}</div >
  );
}

export default Cell;