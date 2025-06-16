type PlaceShipArgs = {
  rows: string[];
  columns: string[];
  count: number;
  size: number;
};

const getRandomValue = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const placeShip = ({
  rows,
  columns,
  count,
  size,
}: PlaceShipArgs): string[] => {
  const isVertical = false;

  //pick random starting column and row
  const startRow = getRandomValue(rows);
  const startCol = getRandomValue(columns);

  // create arry of all available coordinates
  const availableCoordinates = rows.reduce<string[]>(
    (acc, letter) => acc.concat(columns.map((number) => `${letter}${number}`)),
    []
  );

  const coordinates = [];
  const startingSquare = `${startRow}${startCol}`;

  // number of ships
  for (let i = 0; i < count; i++) {
    // size of ship
    for (let y = 0; y < size; y++) {
      const picked = availableCoordinates.findIndex(
        (i) => i === startingSquare
      );

      const position = isVertical
        ? availableCoordinates[picked + 10]
        : availableCoordinates[picked + y];
      coordinates.push(position);
    }
  }

  return coordinates;
};
