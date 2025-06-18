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

const rows = createGridValues('row');
const columns = createGridValues('column');
const allCoordinates = getAllPossibleCoordinates({ rows, columns });

export const Input = ({
  setComputerCoordinates,
  userInput,
  setUserInput,
}: UserInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation, do nothing if input is not valid
    const isValid = validateUserInput(allCoordinates, userInput);
    if (!isValid) return;

    setComputerCoordinates((prev) =>
      prev.map((coordinateObj) =>
        coordinateObj.coordinate === userInput
          ? { ...coordinateObj, hit: true }
          : coordinateObj
      )
    );
    setUserInput('');
  };
  return (
    <section className='input'>
      <h2>Enter Attack Coordinates</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='coords'>Coordinates - example: A1</label>
        <input
          id='coords'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          placeholder='A1'
          maxLength={3}
        />
      </form>
    </section>
  );
};
