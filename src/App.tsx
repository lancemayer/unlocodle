import { Component, createEffect, createSignal, For, onCleanup, Show } from 'solid-js';
import Cell from './components/Cell';

const App: Component = () => {
  interface CellInfo {
    value: string;
    color: "no_match" | "exists" | "match";
  }

  const solution = "USCLE";

  // TODO: Create function to calculate game status based on last guess and number of guesses
  const [gameResult, setGameResult] = createSignal<"unfinished" | "win" | "loss">("unfinished");
  const keyboard: string[][] = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
  ]

  const totalGuesses = 6;
  const [guess, setGuess] = createSignal("");
  const [committedGuesses, setCommittedGuesses] = createSignal<CellInfo[][]>([]);

  const [tooShortMessage, setTooShortMessage] = createSignal("");

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.repeat === true) {
      return;
    }
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
    document.addEventListener("keydown", handleKeyPress);

    onCleanup(() => document.removeEventListener("keydown", handleKeyPress));
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
        <h1 class="font-extrabold text-3xl text-center">UNLOCODLE</h1>
        <div class="w-[350px] mx-auto">
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
              <Cell>{guess()[0]}</Cell>
              <Cell>{guess()[1]}</Cell>
              <Cell>{guess()[2]}</Cell>
              <Cell>{guess()[3]}</Cell>
              <Cell>{guess()[4]}</Cell>
            </div>
            <For each={Array(5 - committedGuesses().length)}>
              {row => (
                <div hidden class="mt-2 max-w-lg grid grid-cols-5">
                  <Cell></Cell>
                  <Cell></Cell>
                  <Cell></Cell>
                  <Cell></Cell>
                  <Cell></Cell>
                </div>
              )}
            </For>
            <div>{tooShortMessage}</div>
          </Show>
        </div>
        <div class="w-[500] mx-auto space-y-1 mt-4">
          <For each={keyboard}>
            {row => (
              <div class="w-max mx-auto space-x-1">
                <For each={row}>
                  {key => (
                    <button
                      className={`${key === "Enter" || key === "Delete" ? "w-[65px]" : "w-[43px]"} rounded-md h-[3.5rem] bg-[#d3d6da] text-black font-bold`}
                      onClick={() => {
                        if (key === "Enter") {
                          enterGuess();
                        }
                        else if (key === "Delete") {
                          deleteLetter();
                        }
                        else {
                          inputLetter(key);
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
        </div>
        <Show when={gameResult() === 'win'}>
          <div>{gameResult()}</div>
        </Show>
      </div >
    </div >
  );
};

export default App;
