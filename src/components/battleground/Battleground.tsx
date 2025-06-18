import './Battleground.css';
import type { ComputerCoordinates } from '../../globalTypes';
import { createGridValues } from '../utils';

const columns = createGridValues('column'); // A–J
const rows = createGridValues('row'); // 1–10

type RenderTableDataCellsArgs = {
  column: string;
  row: string;
  computerCoordinates: ComputerCoordinates;
};
const renderTableDataCells = ({
  column,
  row,
  computerCoordinates,
}: RenderTableDataCellsArgs) => {
  const cellName = `${column}${row}`;
  const isHit = computerCoordinates.find(
    ({ coordinate }) => coordinate === cellName
  )?.hit;
  const cellState = isHit ? 'hit' : 'not-hit';
  const cellInfo = `${cellName}, ${cellState}`;
  return (
    <td key={`cell-${column}-${row}`} className={cellState}>
      {/* hidden text for screen reader users */}
      <p className='sr-only'>{cellInfo}</p>
    </td>
  );
};

type BattlegroundProps = {
  computerCoordinates: ComputerCoordinates;
};

export const Battleground = ({ computerCoordinates }: BattlegroundProps) => (
  <table className='battleground-table'>
    {/* hidden text for screen readers */}
    <caption className='sr-only'>Battleground</caption>
    <thead>
      <tr>
        {/* Empty corner cell */}
        <td></td>
        {columns.map((column) => (
          <th key={`col-${column}`} scope='col'>
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={`row-${row}`}>
          <th scope='row'>{row}</th>
          {columns.map((column) =>
            renderTableDataCells({ column, row, computerCoordinates })
          )}
        </tr>
      ))}
    </tbody>
  </table>
);
