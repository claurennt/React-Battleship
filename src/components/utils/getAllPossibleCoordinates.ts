export const getAllPossibleCoordinates = ({
  rows,
  columns,
}: {
  rows: string[];
  columns: string[];
}) => columns.flatMap((column) => rows.map((row) => `${column}${row}`));
