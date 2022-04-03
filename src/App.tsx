import { Component, createSignal, For, Show } from 'solid-js';

const App: Component = () => {
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
          {guess => <p>{guess}</p>}
        </For>

        <Show when={committedGuesses().length < 6}>
          <p>0: {guess()[0]}</p>
          <p>1: {guess()[1]}</p>
          <p>2: {guess()[2]}</p>
          <p>3: {guess()[3]}</p>
          <p>4: {guess()[4]}</p>
          <For each={Array(5 - committedGuesses().length).fill(null)}>
            {() => <p>_</p>}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default App;
