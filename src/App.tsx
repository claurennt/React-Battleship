import { useState, useEffect } from 'react';
import './App.css';
import { Battleground } from './components/battleground/Battleground';
import { ShipsAside, ships } from './components/ShipsInfo';
import { Input } from './components/userMove';
import { placeShip } from './components/battleground/utils/placeShip';
import { columns, rows } from './components/utils';
import type { ComputerCoordinates } from './globalTypes';

function App() {
  const [computerCoordinates, setComputerCoordinates] =
    useState<ComputerCoordinates>([]);
  const [userInput, setUserInput] = useState('');
  useEffect(() => {
    const allCoordinates: ComputerCoordinates = ships
      .flatMap(({ count, size }) =>
        placeShip({ rows, columns, count, size }).flat()
      )
      .map((coordinate) => ({ coordinate, hit: false }));

    setComputerCoordinates(allCoordinates);
  }, []);

  return (
    <>
      <header>
        <h1>React Battleship</h1>
      </header>
      <main>
        <Input
          computerCordinates={computerCoordinates}
          userInput={userInput}
          setUserInput={setUserInput}
          setComputerCoordinates={setComputerCoordinates}
        />
        <Battleground computerCordinates={computerCoordinates} />
        <ShipsAside ships={ships} />
      </main>
    </>
  );
}

export default App;
