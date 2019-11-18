export const sum = (arr, key) => {
  return arr.reduce((a, b) => a + (b[key] || 0), 0);
};