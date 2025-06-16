import './App.css';
import { Battleground } from './components/battleground/Battleground';
import { ShipsAside, ships } from './components/ShipsInfo';

function App() {
  return (
    <>
      <header>
        <h1>React Battleship</h1>
      </header>
      <main>
        <Battleground />
        <ShipsAside ships={ships} />
      </main>
    </>
  );
}

export default App;
