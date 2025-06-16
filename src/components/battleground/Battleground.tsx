import { useState, useEffect } from 'react';
import { columns, rows } from '../utils';
import './Battleground.css';
import { placeShip, type Coordinates } from './utils/placeShip';
import { ships } from '../ShipsInfo';

export const Battleground: React.FunctionComponent = () => {
  const [shipsCoordinates, setShipsCoordinates] = useState<Coordinates>([]);

  useEffect(() => {
    const allCoordinates: Coordinates = [];

    ships.forEach(({ count, size }) => {
      const shipGroup = placeShip({ rows, columns, count, size });

      allCoordinates.push(...shipGroup); //flatten cordinates array
    });

    setShipsCoordinates(allCoordinates);
  }, []);
  console.log(shipsCoordinates.flat());
  return (
    <table className='battleground-table'>
      {/* hidden text for screen readers */}
      <caption className='sr-only'>Battleground</caption>
      <thead>
        <tr>
          {/* Empty corner cell */}
          <td></td>
          {columns.map((col) => (
            <th key={`col-${col}`} scope='col'>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={`row-${row}`}>
            <th scope='row'>{row}</th>
            {columns.map((col) => (
              <td key={`cell-${col}-${row}`}>
                {/* hidden text for screen readers */}
                <p className='sr-only'>{`${col} ${row}`}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
