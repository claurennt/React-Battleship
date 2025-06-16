import { columns, rows } from '../utils';
import './Battleground.css';
import type { ComputerCoordinates } from '../../globalTypes';

export const Battleground: React.FunctionComponent<{
  computerCordinates: ComputerCoordinates;
}> = ({ computerCordinates }) => {
  console.log(computerCordinates);
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
        {rows.map((row) => {
          return (
            <tr key={`row-${row}`}>
              <th scope='row'>{row}</th>
              {columns.map((col) => {
                const cellName = `${col} ${row}`;
                const cellState = 'not hit';
                const cellInfo = `${cellName} ${cellState}`;
                return (
                  <td key={`cell-${col}-${row}`}>
                    {/* hidden text for screen readers */}
                    <p className='sr-only'>{cellInfo}</p>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
