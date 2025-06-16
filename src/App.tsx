import './App.css';
import { ShipsAside, ships } from './components/ShipsInfo';

function App() {
  return (
    <>
      <header>
        <h1>React Battleship</h1>
      </header>
      <main>
        <ShipsAside ships={ships} />
      </main>
    </>
  );
}

export default App;
