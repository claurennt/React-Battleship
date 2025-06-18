import { getAllPossibleCoordinates } from './getAllPossibleCoordinates';

const getRandomValue = (array: string[], size: number): string => {
  const maxStartIndex = array.length - size;
  const randomIndex = Math.floor(Math.random() * (maxStartIndex + 1)); // stay within grid boundaries;
  return array[randomIndex];
};

const isWithinSameRow = (
  startingSquareIndex: number,
  currentSquareIndex: number,
  gridSize: number
): boolean => {
  const startRow = Math.floor(startingSquareIndex / gridSize);
  const endRow = Math.floor(currentSquareIndex / gridSize);
  // If the starting row and current row are different, it's an invalid wrap
  return startRow === endRow;
};

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

  if (!isVertical) {
    return isWithinSameRow(startingSquareIndex, currentSquareIndex, gridSize);
  }

  return true;
};

type GetRandomStartingSquareArgs = Pick<
  CreateComputerCoordinatesArgs,
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
  const startColumn = getRandomValue(columns, size);

  const startingSquare = `${startColumn}${startRow}`;
  const startingSquareIndex = availableCoordinates.findIndex(
    (coordinate) => coordinate === startingSquare
  );

  return startingSquareIndex;
};

type Coordinates = string[][];

type CreateComputerCoordinatesArgs = {
  rows: string[];
  columns: string[];
  count: number;
  size: number;
};

export const createComputerCoordinates = ({
  rows,
  columns,
  count,
  size,
}: CreateComputerCoordinatesArgs): string[] => {
  const availableCoordinates = getAllPossibleCoordinates({ rows, columns });
  const coordinates: Coordinates = [];
  const gridSize = columns.length;

  const getValidShipCoordinates = (attempts = 0): string[] => {
    if (attempts > 30) {
      throw new Error('Unable to place ship - too many attempts');
    }

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
      if (!isValid) return getValidShipCoordinates(attempts + 1);

      const offset = isVertical ? squarePosition * gridSize : squarePosition;

      const position = availableCoordinates[startingSquareIndex + offset];

      oneShipCoordinates.push(position);
    }

    const isOverlap = oneShipCoordinates.some((pos) =>
      coordinates.flat().includes(pos)
    );

    // retry ship placement creation
    if (isOverlap) return getValidShipCoordinates(attempts + 1);

    return oneShipCoordinates;
  };

  // number of ships
  for (let i = 0; i < count; i++) {
    const shipCoordinates = getValidShipCoordinates();
    coordinates.push(shipCoordinates);
  }

  return coordinates.flat();
};
