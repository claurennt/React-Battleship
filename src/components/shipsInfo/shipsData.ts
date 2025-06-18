export type ComputerShip = {
  id: string;
  name: string;
  count: number;
  size: number;
};

export const ships: ComputerShip[] = [
  { id: 'battleship', name: 'Battleship', count: 1, size: 5 },
  { id: 'destroyer', name: 'Destroyer', count: 2, size: 4 },
];
