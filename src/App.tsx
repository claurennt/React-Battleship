import { useState, useEffect } from 'react';
import './App.css';
import { Input, Battleground, ShipsAside, ships } from './components';
import { placeShip, createGridValues } from './components/utils';
import type { ComputerCoordinates } from './globalTypes';

function App() {
  const [computerCoordinates, setComputerCoordinates] =
    useState<ComputerCoordinates>([]);
  const [userInput, setUserInput] = useState('');

  const columns = createGridValues({ type: 'column' }); // 1–10
  const rows = createGridValues({ type: 'row' }); // A–J

  useEffect(() => {
    const allCoordinates: ComputerCoordinates = ships
      .flatMap(({ count, size }) =>
        placeShip({ rows, columns, count, size }).flat()
      )
      .map((coordinate) => ({ coordinate, hit: false }));

    setComputerCoordinates(allCoordinates);
  }, []);

  console.log(
    'cheat mode 😆',
    computerCoordinates.map(({ coordinate }) => coordinate)
  );

  return (
    <>
      <header>
        <h1>React Battleship</h1>
      </header>
      <main>
        <Input
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
