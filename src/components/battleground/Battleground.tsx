import './Battleground.css';
import { createGridValues } from '../utils';

const columns = createGridValues('column'); // A–J
const rows = createGridValues('row'); // 1–10

type RenderTableDataCellsArgs = {
  column: string;
  row: string;
  hits: string[];
  misses: string[];
};

const getCellState = (coordinate: string, hits: string[], misses: string[]) => {
  if (hits.includes(coordinate)) return 'hit';
  if (misses.includes(coordinate)) return 'missed';
  return 'untargeted';
};

const renderTableDataCells = ({
  column,
  row,
  hits,
  misses,
}: RenderTableDataCellsArgs) => {
  const coordinate = `${column}${row}`;
  const state = getCellState(coordinate, hits, misses);
  const cellContent = `${coordinate} ${
    state === 'hit' ? 'hit' : state === 'missed' ? 'missed' : 'untargeted'
  }`;
  return (
    <td key={`cell-${column}-${row}`} className={state}>
      {/* Show X for misses */}
      {state === 'missed' && <span aria-hidden='true'>X</span>}
      <p className='sr-only'>{cellContent}</p>
    </td>
  );
};

type BattlegroundProps = {
  hits: string[];
  misses: string[];
};

export const Battleground = ({ hits, misses }: BattlegroundProps) => (
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
            renderTableDataCells({ row, column, hits, misses })
          )}
        </tr>
      ))}
    </tbody>
  </table>
);
