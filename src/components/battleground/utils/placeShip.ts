type PlaceShipArgs = {
  rows: string[];
  columns: string[];
  count: number;
  size: number;
};

const getRandomValue = (array: string[], size: number) =>
  array[Math.floor(Math.random() * (array.length - size + 1))]; // stay within grid boundaries;

type CreatePositionArgs = {
  isVertical: boolean;
  availableCoordinates: string[];
  startingSquareIndex: number;
  step: number;
  gridSize?: number;
};

const createPosition = ({
  isVertical,
  availableCoordinates,
  startingSquareIndex,
  step,
  gridSize = 10,
}: CreatePositionArgs) =>
  isVertical
    ? availableCoordinates[startingSquareIndex + step + gridSize] // Move down one full row (gridSize) per step for vertical placement
    : availableCoordinates[startingSquareIndex + step]; // Move right per step for horizontal placement

type GetStartingSquareArgs = Pick<
  PlaceShipArgs,
  'rows' | 'columns' | 'size'
> & {
  availableCoordinates: string[];
};

const getStartingSquareIndex = ({
  rows,
  columns,
  size,
  availableCoordinates,
}: GetStartingSquareArgs) => {
  //pick random starting column and row
  const startRow = getRandomValue(rows, size);
  const startCol = getRandomValue(columns, size);

  const startingSquare = `${startRow}${startCol}`;
  const startingSquareIndex = availableCoordinates.findIndex(
    (coordinate) => coordinate === startingSquare
  );
  return startingSquareIndex;
};

export type Coordinates = string[][];

export const placeShip = ({
  rows,
  columns,
  count,
  size,
}: PlaceShipArgs): Coordinates => {
  const isVertical = Math.random() < 0.5;

  // create array of all available coordinates
  const availableCoordinates = rows.reduce<string[]>(
    (acc, letter) => acc.concat(columns.map((number) => `${letter}${number}`)),
    []
  );

  const coordinates: Coordinates = [];

  // number of ships
  for (let i = 0; i < count; i++) {
    const startingSquareIndex = getStartingSquareIndex({
      rows,
      columns,
      size,
      availableCoordinates,
    });

    let oneShipPositions: string[] = [];

    // size of ship
    for (let y = 0; y < size; y++) {
      const position = createPosition({
        isVertical,
        availableCoordinates,
        startingSquareIndex,
        step: y,
      });

      const isTaken = coordinates.some(([coordinate]) =>
        coordinate.startsWith(position)
      );

      // coordinate already exists -- avoid duplicates
      if (isTaken) {
        const newStartingSquareIndex = getStartingSquareIndex({
          rows,
          columns,
          size,
          availableCoordinates,
        });
        const newPosition = createPosition({
          isVertical,
          availableCoordinates,
          startingSquareIndex: newStartingSquareIndex,
          step: y,
        });
        oneShipPositions.push(newPosition);
      } else oneShipPositions.push(position);
    }

    coordinates.push(oneShipPositions);
  }

  return coordinates;
};
