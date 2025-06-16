export const createGridValues = (
  type: 'column' | 'row',
  colHeaders: string = 'ABCDEFGHIJ'
) => {
  const getLabel = (i: number): string => {
    if (type === 'row') {
      return (i + 1).toString();
    }
    return colHeaders[i];
  };

  const gridLabels = Array.from({ length: 10 }, (_, i) => getLabel(i));

  return gridLabels;
};
const columns = createGridValues('column'); // 1–10
const rows = createGridValues('row'); // A–J

export { columns, rows };
