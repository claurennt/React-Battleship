import type { ComputerShip } from './shipsData';
import ShipInstance from './ShipInstance';

const Ship: React.FC<ComputerShip> = ({ name, size, count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, shipIdx) => (
        <ShipInstance
          key={`ship-${name}-${shipIdx}`}
          name={name}
          shipIdx={shipIdx}
          size={size}
        />
      ))}
    </>
  );
};

export default Ship;
