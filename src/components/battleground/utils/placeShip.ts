type PlaceShipArgs = {
  rows: string[];
  columns: string[];
  count: number;
  size: number;
};

const getRandomValue = (array: string[], size: number) =>
  array[Math.floor(Math.random() * (array.length - size + 1))]; // stay within grid boundaries;

export const placeShip = ({
  rows,
  columns,
  count,
  size,
}: PlaceShipArgs): string[] => {
  const isVertical = false;

  // create arry of all available coordinates
  const availableCoordinates = rows.reduce<string[]>(
    (acc, letter) => acc.concat(columns.map((number) => `${letter}${number}`)),
    []
  );

  const coordinates = [];

  // number of ships
  for (let i = 0; i < count; i++) {
    //pick random starting column and row
    const startRow = getRandomValue(rows, size);
    const startCol = getRandomValue(columns, size);
    const startingSquare = `${startRow}${startCol}`;

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
