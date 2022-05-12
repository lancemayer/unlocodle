import { children, JSX } from "solid-js";

const Cell = (props: { children?: JSX.Element }) => {
  const c = children(() => props.children);
  return (
    <div class="flex items-center justify-center rounded-md h-16 w-16 border-2 border-[#d3d6da]">{c()}</div>
  );
}

export default Cell;