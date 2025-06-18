import { useState } from 'react';
import './App.css';
import { Input, Battleground, ShipsInfo, ships } from './components';
import {
  createComputerCoordinates,
  createGridValues,
} from './components/utils';
import type { ComputerCoordinates } from './globalTypes';

const columns = createGridValues('column'); // 1–10
const rows = createGridValues('row'); // A–J
const allCoordinates: ComputerCoordinates = ships
  .flatMap(({ count, size }) => {
    const coordinates = createComputerCoordinates({
      rows,
      columns,
      count,
      size,
    });
    return coordinates;
  })
  .map((coordinate) => ({ coordinate, hit: false }));

const App = () => {
  const [computerCoordinates, setComputerCoordinates] =
    useState<ComputerCoordinates>(allCoordinates);
  const [userInput, setUserInput] = useState<string>('');

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
        <Battleground computerCoordinates={computerCoordinates} />
        <ShipsInfo ships={ships} />
      </main>
    </>
  );
};

export default App;
