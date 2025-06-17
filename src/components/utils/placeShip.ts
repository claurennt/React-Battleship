import { getAllPossibleCoordinates } from './getAllPossibleCoordinates';

type PlaceShipArgs = {
  rows: string[];
  columns: string[];
  count: number;
  size: number;
};

const getRandomValue = (array: string[], size: number) =>
  array[Math.floor(Math.random() * (array.length - size + 1))]; // stay within grid boundaries;

type IsPositionValidArgs = {
  isVertical: boolean;
  availableCoordinates: string[];
  startingSquareIndex: number;
  squarePosition: number;
  gridSize?: number;
};

const isPositionValid = ({
  availableCoordinates,
  squarePosition,
  isVertical,
  startingSquareIndex,
  gridSize = 10,
}: IsPositionValidArgs): boolean => {
  const offset = isVertical
    ? squarePosition * gridSize //Vertical: offset by full rows (gridSize)
    : squarePosition; // Horizontal: offset by 1 column;

  const currentSquareIndex = startingSquareIndex + offset;

  // Check if the current square index is generally valid
  const isValidPosition =
    currentSquareIndex >= 0 && currentSquareIndex < availableCoordinates.length;

  if (!isValidPosition) return false;

  // Make sure the ship doesn't wrap to the next row
  if (!isVertical) {
    const startRow = Math.floor(startingSquareIndex / gridSize);
    const endRow = Math.floor(currentSquareIndex / gridSize);

    // If the starting row and current row are different, it's an invalid wrap
    return startRow === endRow;
  }

  return true;
};

type GetRandomStartingSquareArgs = Pick<
  PlaceShipArgs,
  'rows' | 'columns' | 'size'
> & {
  availableCoordinates: string[];
};

const getRandomStartingSquareIndex = ({
  rows,
  columns,
  size,
  availableCoordinates,
}: GetRandomStartingSquareArgs): number => {
  const startRow = getRandomValue(rows, size);
  const startCol = getRandomValue(columns, size);

  const startingSquare = `${startCol}${startRow}`;
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
  const availableCoordinates = getAllPossibleCoordinates({ rows, columns });
  const coordinates: Coordinates = [];
  const gridSize = columns.length;

  const getValidShipCoordinates = (): string[] => {
    const isVertical = Math.random() < 0.5;

    const startingSquareIndex = getRandomStartingSquareIndex({
      rows,
      columns,
      size,
      availableCoordinates,
    });

    const oneShipCoordinates: string[] = [];

    // number of squares per ship
    for (let squarePosition = 0; squarePosition < size; squarePosition++) {
      const isValid = isPositionValid({
        availableCoordinates,
        squarePosition,
        isVertical,
        startingSquareIndex,
        gridSize,
      });

      // retry ship placement creation
      if (!isValid) return getValidShipCoordinates();

      const offset = isVertical ? squarePosition * gridSize : squarePosition;

      const position = availableCoordinates[startingSquareIndex + offset];

      oneShipCoordinates.push(position);
    }

    const isOverlap = oneShipCoordinates.some((pos) =>
      coordinates.flat().includes(pos)
    );

    // retry ship placement creation
    if (isOverlap) return getValidShipCoordinates();

    return oneShipCoordinates;
  };

  // number of ships
  for (let i = 0; i < count; i++) {
    const shipCoordinates = getValidShipCoordinates();
    coordinates.push(shipCoordinates);
  }

  return coordinates;
};
