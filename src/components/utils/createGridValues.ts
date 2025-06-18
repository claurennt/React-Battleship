export const createGridValues = (
  type: 'column' | 'row',
  columnHeaders: string = 'ABCDEFGHIJ'
) => {
  const getLabel = (i: number): string => {
    if (type === 'row') {
      return (i + 1).toString();
    }
    return columnHeaders[i];
  };

  const gridLabels = Array.from({ length: columnHeaders.length }, (_, i) =>
    getLabel(i)
  );

  return gridLabels;
};
