import type { ComputerShip } from './shipsData';
import './ShipsAside.css'; // CSS Modules

const renderShipSquares = (size: number) =>
  Array.from({ length: size }, (_, squareIndex) => (
    <div key={`square-${squareIndex}`} className='ship-square' />
  ));

type renderShipArgs = {
  name: string;
  size: number;
  count: number;
};
const renderShip = ({ name, size, count }: renderShipArgs) => {
  const info = `${count} ${name} (${size} squares)`;
  return (
    <li key={name}>
      <p>{info}</p>
      {Array.from({ length: count }, (_, shipIndex) => (
        <div key={`ship-${shipIndex}`} className='ship'>
          {renderShipSquares(size)}
        </div>
      ))}
    </li>
  );
};

type ShipsInfoProps = {
  ships: ComputerShip[];
};

export const ShipsInfo = ({ ships }: ShipsInfoProps) => (
  <aside>
    <h2>Ships to be destroyed</h2>
    <ul className='ship-container'>
      {ships.map(({ name, size, count }) => renderShip({ name, size, count }))}
    </ul>
  </aside>
);
