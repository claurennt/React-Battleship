type CreateGridValuesArgs = {
  type: 'column' | 'row';
  colHeaders?: string;
};

export const createGridValues = ({
  type,
  colHeaders = 'ABCDEFGHIJ',
}: CreateGridValuesArgs) => {
  const getLabel = (i: number): string => {
    if (type === 'row') {
      return (i + 1).toString();
    }
    return colHeaders[i];
  };

  const gridLabels = Array.from({ length: 10 }, (_, i) => getLabel(i));

  return gridLabels;
};
