import { useState, useEffect } from 'react';
import { columns, rows } from '../utils';
import './Battleground.css';
import { placeShip } from './utils/placeShip';
import { ships } from '../ShipsInfo';

export const Battleground: React.FunctionComponent = () => {
  const [shipsCoordinates, setShipsCoordinates] = useState<
    { coordinates: string[] }[]
  >([]);

  useEffect(() => {
    ships.forEach(({ count, size }) => {
      const shipCoordinates = placeShip({
        rows,
        columns,
        count,
        size,
      });
      setShipsCoordinates([{ coordinates: shipCoordinates }]);
    });
  }, []);

  console.log(shipsCoordinates);

  return (
    <table className='battleground-table'>
      {/* hidden text for screen readers */}
      <caption className='sr-only'>Battleground</caption>
      <thead>
        <tr>
          <td></td> {/* Empty corner cell */}
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
