export const sortbyPos = <T extends { position: string | null }>(
  a: T,
  b: T,
) => {
  if (a.position === null || b.position === null) {
    return 0;
  }
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
};
