export const sum = (arr, key) => {
  return arr.reduce((a, b) => a + (b[key] || 0), 0);
};

export const getHash = (url) => {
  const arr = url.split('/');
  return arr[arr.length - 1].toLowerCase();
};