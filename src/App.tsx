import { useEffect, useState } from 'react';
import './App.css';
import { Input, Battleground, ShipsInfo, ships } from './components';
import {
  createComputerCoordinates,
  createGridValues,
} from './components/utils';
import type { ComputerShip } from './components/';

const columns = createGridValues('column'); // 1–10
const rows = createGridValues('row'); // A–J
const computerCoordinates = ships.flatMap(({ count, size }: ComputerShip) => {
  const coordinates = createComputerCoordinates({
    rows,
    columns,
    count,
    size,
  });
  return coordinates;
});

const App = () => {
  const [hits, setHits] = useState<string[]>([]);
  const [misses, setMisses] = useState<string[]>([]);

  useEffect(() => {
    if (hits.length === computerCoordinates.length) {
      alert('You won! 🎉');
    }
  }, [hits]);

  const fireShot = (coordinate: string) => {
    if (hits.includes(coordinate) || misses.includes(coordinate)) return;

    computerCoordinates.includes(coordinate)
      ? setHits([...hits, coordinate])
      : setMisses([...misses, coordinate]);
  };
  console.log('cheat mode 😆', computerCoordinates);

  return (
    <>
      <header>
        <h1>React Battleship</h1>
      </header>
      <main>
        <Input fireShot={fireShot} />
        <Battleground hits={hits} misses={misses} />
        <ShipsInfo ships={ships} />
      </main>
    </>
  );
};

export default App;
