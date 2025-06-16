import './Ship.css';

type ShipInstanceProps = {
  name: string;
  shipIdx: number;
  size: number;
};
const ShipInstance: React.FC<ShipInstanceProps> = ({ name, shipIdx, size }) => {
  return (
    <div>
      {Array.from({ length: size }, (_, squareIdx) => (
        <div
          key={`ship-square-${name}-${shipIdx}-${squareIdx}`}
          className='ship-square'
        />
      ))}
    </div>
  );
};

export default ShipInstance;
