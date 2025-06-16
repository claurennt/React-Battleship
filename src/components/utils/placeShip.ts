import { getAllPossibleCoordinates } from './getAllPossibleCoordinates';

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
  squarePosition: number;
  gridSize?: number;
};

const createPosition = ({
  isVertical,
  availableCoordinates,
  startingSquareIndex,
  squarePosition,
  gridSize = 10,
}: CreatePositionArgs) =>
  isVertical
    ? availableCoordinates[startingSquareIndex + squarePosition * gridSize] // Move down one full row (gridSize) per step for vertical placement
    : availableCoordinates[startingSquareIndex + squarePosition]; // Move right per step for horizontal placement

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

  const getValidShipCoordinates = (): string[] => {
    const isVertical = Math.random() < 0.5;
    const startingSquareIndex = getStartingSquareIndex({
      rows,
      columns,
      size,
      availableCoordinates,
    });

    const oneShipCoordinates: string[] = [];

    for (let squarePosition = 0; squarePosition < size; squarePosition++) {
      const position = createPosition({
        isVertical,
        availableCoordinates,
        startingSquareIndex,
        squarePosition,
      });

      oneShipCoordinates.push(position);
    }

    const isOverlap = oneShipCoordinates.some((pos) =>
      coordinates.flat().includes(pos)
    );
    if (isOverlap) return getValidShipCoordinates();

    return oneShipCoordinates;
  };

  for (let i = 0; i < count; i++) {
    const shipCoordinates = getValidShipCoordinates();
    coordinates.push(shipCoordinates);
  }

  return coordinates;
};
