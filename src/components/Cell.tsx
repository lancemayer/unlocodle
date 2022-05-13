import { children, JSX } from "solid-js";

const Cell = (props: { color?: string, children?: JSX.Element }) => {
  const c = children(() => props.children);
  return (
    <div class={`${props.color != null ? (props.color === "match" ? "bg-green-500" : props.color === "exists" ? "bg-yellow-300" : "bg-gray-400") : ""} flex items-center justify-center text-3xl font-extrabold rounded-md h-16 w-16 border-2 border-[#d3d6da]`}>{c()}</div >
  );
}

export default Cell;