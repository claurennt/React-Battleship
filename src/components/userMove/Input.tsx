import { useState } from 'react';
import './Input.css';

type InputProps = {
  fireShot: (coordinate: string) => void;
};

export const Input = ({ fireShot }: InputProps) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const coordinate = userInput.toUpperCase();
    fireShot(coordinate);
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
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='A1'
          maxLength={3}
        />
      </form>
    </section>
  );
};
