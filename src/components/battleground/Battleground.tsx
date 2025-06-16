import './Battleground.css';
import type { ComputerCoordinates } from '../../globalTypes';
import { createGridValues } from '../utils';

export const Battleground: React.FunctionComponent<{
  computerCordinates: ComputerCoordinates;
}> = ({ computerCordinates }) => {
  const columns = createGridValues({ type: 'column' }); // 1–10
  const rows = createGridValues({ type: 'row' }); // A–J

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
                const cellName = `${col}${row}`;
                const cellState = computerCordinates.find(
                  ({ coordinate }) => coordinate === cellName
                )?.hit;
                const cellInfo = `${cellName} ${cellState?.toString()}`;
                return (
                  <td
                    key={`cell-${col}-${row}`}
                    className={cellState ? 'hit' : 'not-hit'}
                  >
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
