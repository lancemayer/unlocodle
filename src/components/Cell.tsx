import { children, JSX } from "solid-js";

const Cell = (props: { children?: JSX.Element }) => {
  const c = children(() => props.children);
  return (
    <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{c()}</div>
  );
}

export default Cell;