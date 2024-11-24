import { removeFileFromArray } from '../app/es6/utils/arrayUtils';

describe('removeFileFromArray', () => {
  const files = [
    { id: 1 },
    { id: 3 },
    { id: 6 },
    { id: 7 },
    { id: 9 },
    { id: 4 },
    { id: 2 },
    { id: 5 },
  ];

  it('removes the element at the specified position', () => {
    const b = removeFileFromArray(files, 3);
    expect(b[2].id).not.toBe(3);
  });

  it('removes one element if it finds it', () => {
    const b = removeFileFromArray(files, 3);
    expect(b.length).toBe(files.length - 1);
  });
});
