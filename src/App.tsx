import { Component, createSignal } from 'solid-js';

const App: Component = () => {
  const [name, setName] = createSignal('');

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      setName(name().slice(0, name().length - 1));
    }
    else if (/^[a-zA-Z0-9]$/.test(e.key.toLowerCase())) {
      if (name().length < 5) {
        setName(name() + e.key.toUpperCase());
      }
    }
  };

  document.addEventListener("keydown", handleKeyPress, false);

  return (
    <div>
      <h1>UNLOCODLE</h1>
      <p>Name: {name()}</p>
      <p>0: {name()[0]}</p>
      <p>1: {name()[1]}</p>
      <p>2: {name()[2]}</p>
      <p>3: {name()[3]}</p>
      <p>4: {name()[4]}</p>
    </div>
  );
};

export default App;
