import type { ComputerShip } from './shipsData';
import './ShipsAside.css'; // CSS Modules

interface ShipsInfoProps {
  ships: ComputerShip[];
}

const renderShipSquares = (size: number) =>
  Array.from({ length: size }, (_, squareIndex) => (
    <div key={`square-${squareIndex}`} className='ship-square' />
  ));

export const ShipsAside = ({ ships }: ShipsInfoProps) => {
  return (
    <aside>
      <h2>Ships to be destroyed</h2>

      <div>
        {' '}
        <ul className='ship-container'>
          {ships.map(({ name, size, count }) => {
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
          })}
        </ul>
      </div>
    </aside>
  );
};
