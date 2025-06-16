export const validateUserInput = (
  allCoordinates: string[],
  userInput: string
) => {
  const isValid = allCoordinates.some((coordinate) => coordinate === userInput);
  return isValid;
};
