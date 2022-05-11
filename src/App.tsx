import { Component, createEffect, createSignal, For, onCleanup, Show } from 'solid-js';

const App: Component = () => {
  interface CellInfo {
    value: string;
    color: "no_match" | "exists" | "match";
  }

  const solution = "USCLE";

  // TODO: Create function to calculate game status based on last guess and number of guesses
  const [gameResult, setGameResult] = createSignal<"unfinished" | "win" | "loss">("unfinished");
  const keyboard: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
  ]

  const totalGuesses = 6;
  const [guess, setGuess] = createSignal("");
  const [committedGuesses, setCommittedGuesses] = createSignal<CellInfo[][]>([]);

  const [tooShortMessage, setTooShortMessage] = createSignal("");

  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Backspace") {
      deleteLetter();
    }
    else if (e.key === "Enter") {
      enterGuess();
    }
    else if (/^[a-zA-Z0-9]$/.test(e.key.toLowerCase())
      && !(e.metaKey || e.ctrlKey)
    ) {
      inputLetter(e.key.toUpperCase());
    }
  };

  createEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    onCleanup(() => document.removeEventListener("keypress", handleKeyPress));
  })

  const deleteLetter = () => {
    setGuess(guess().slice(0, guess().length - 1));
  }

  const enterGuess = () => {
    if (guess().length < 5) {
      setTooShortMessage("Guess must be 5 letters long");
      return;
    }
    if (guess().length === 5 && committedGuesses().length < 6) {
      setTooShortMessage("");
      if (guess() === solution) {
        setGameResult("win");
      }

      let remainingLetters = Array.from(solution);

      let guessColored: CellInfo[] = Array.from(guess()).map(letter => {
        return {
          value: letter,
          color: "no_match"
        };
      });

      for (let i = 0; i < 5; i++) {
        if (guess()[i] === solution[i]) {
          guessColored[i].color = "match";
          remainingLetters[i] = "";
        }
      }
      for (let i = 0; i < 5; i++) {
        if (remainingLetters[i] !== "" && remainingLetters.includes(guess()[i])) {
          guessColored[i].color = "exists";
        }
      }

      setCommittedGuesses([...committedGuesses(), guessColored]);
      setGuess("");
    }
  }

  const inputLetter = (letter: string) => {
    if (guess().length < 5
      && committedGuesses().length < 6
      && gameResult() === "unfinished"
    ) {
      setGuess(guess() + letter);
    }
  }

  return (
    <div>
      <div>
        <h1 class="text-center">UNLOCODLE</h1>

        <For each={committedGuesses()}>
          {guess => (
            <div class="mt-2 max-w-lg grid grid-cols-5">
              {Array.from(guess).map(cell => (
                <div class={`${cell.color === "match" ? "bg-green-500" : cell.color === "exists" ? "bg-yellow-300" : "bg-gray-400"} flex items-center justify-center h-16 w-16 border-2 border-black`}>{cell.value}</div>
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
          <div>{tooShortMessage}</div>
        </Show>
        <For each={keyboard}>
          {row => (
            <div>
              <For each={row}>
                {key => (
                  <button
                    className="w-8 h-[3rem] m-1 bg-blue-500 text-white"
                    onClick={() => {
                      if (key === "Enter") {
                        enterGuess();
                      }
                      else if (key === "Delete") {
                        deleteLetter();
                      }
                      else {
                        inputLetter(key)
                      }
                    }
                    }
                  >
                    {key}
                  </button>

                )}
              </For>
            </div>
          )}
        </For>
        <Show when={gameResult() === 'win'}>
          <div>{gameResult()}</div>
        </Show>
      </div>
    </div>
  );
};

export default App;
