type GetAllPossibleCoordinatesArgs = { rows: string[]; columns: string[] };

export const getAllPossibleCoordinates = ({
  rows,
  columns,
}: GetAllPossibleCoordinatesArgs) =>
  columns.flatMap((col) => rows.map((row) => `${col}${row}`));
