export const checkScreen = () => {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  return windowWidth < 1024;
};

export const sum = (arr, key) => {
  return arr.reduce((a, b) => a + (b[key] || 0), 0);
};