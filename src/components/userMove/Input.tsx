import type { ComputerCoordinates } from '../../globalTypes';
import { createGridValues, getAllPossibleCoordinates } from '../utils';
import './Input.css';
import { validateUserInput } from './utils';

type UserInputProps = {
  setComputerCoordinates: React.Dispatch<
    React.SetStateAction<ComputerCoordinates>
  >;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
};

const rows = createGridValues({ type: 'row' });
const columns = createGridValues({ type: 'column' });
const allCoordinates = getAllPossibleCoordinates({ rows, columns });

export const Input: React.FunctionComponent<UserInputProps> = ({
  setComputerCoordinates,
  userInput,
  setUserInput,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation, do othing if input is not valid
    const isValid = validateUserInput(allCoordinates, userInput);
    if (!isValid) return;

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
          maxLength={2}
        />
      </form>
    </div>
  );
};
