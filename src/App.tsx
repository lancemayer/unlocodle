import { Component, createSignal, For, Show } from 'solid-js';

const App: Component = () => {
  const totalGuesses = 6;
  const [guess, setGuess] = createSignal("");
  const [committedGuesses, setCommittedGuesses] = createSignal<string[]>([]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      setGuess(guess().slice(0, guess().length - 1));
    }
    else if (e.key === "Enter") {
      if (guess().length === 5 && committedGuesses().length < 6) {
        setCommittedGuesses([...committedGuesses(), guess()]);
        setGuess("");
      }
    }
    else if (/^[a-zA-Z0-9]$/.test(e.key.toLowerCase())
      && committedGuesses().length < 6
      && !(e.metaKey || e.ctrlKey)
    ) {
      if (guess().length < 5) {
        setGuess(guess() + e.key.toUpperCase());
      }
    }
  };

  document.addEventListener("keydown", handleKeyPress, false);

  return (
    <div>
      <div>
        <h1>UNLOCODLE</h1>
        <For each={committedGuesses()}>
          {guess => (
            <div class="mt-2 max-w-lg grid grid-cols-5">
              {Array.from(guess).map(letter => (
                <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{letter}</div>
              ))}
            </div>
          )}
        </For>

        <Show when={committedGuesses().length < totalGuesses}>
          <div class="mt-2 max-w-lg grid grid-cols-5">
            <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{guess()[0]}</div>
            <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{guess()[1]}</div>
            <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{guess()[2]}</div>
            <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{guess()[3]}</div>
            <div class="flex items-center justify-center h-16 w-16 border-2 border-black">{guess()[4]}</div>
          </div>
          <For each={Array(5 - committedGuesses().length)}>
            {row => (
              <div hidden class="mt-2 max-w-lg grid grid-cols-5">
                <div class="flex items-center justify-center h-16 w-16 border-2 border-black"></div>
                <div class="flex items-center justify-center h-16 w-16 border-2 border-black"></div>
                <div class="flex items-center justify-center h-16 w-16 border-2 border-black"></div>
                <div class="flex items-center justify-center h-16 w-16 border-2 border-black"></div>
                <div class="flex items-center justify-center h-16 w-16 border-2 border-black"></div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default App;
