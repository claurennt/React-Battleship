import type { ComputerCoordinates } from '../../globalTypes';
import './Input.css';

type UserInputProps = {
  computerCordinates: ComputerCoordinates;
  setComputerCoordinates: React.Dispatch<
    React.SetStateAction<ComputerCoordinates>
  >;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
};
export const Input: React.FunctionComponent<UserInputProps> = ({
  computerCordinates,
  setComputerCoordinates,
  userInput,
  setUserInput,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setComputerCoordinates((prev) =>
      prev.map((coordinateObj) =>
        coordinateObj.coordinate === userInput
          ? { ...coordinateObj, hit: true }
          : coordinateObj
      )
    );
  };
  return (
    <div className='input'>
      <h3>Enter Attack Coordinates</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='coords'>Coordinates</label>
        <input
          id='coords'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          placeholder='A1'
          maxLength={3}
        />
      </form>
    </div>
  );
};
