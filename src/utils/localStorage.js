import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setVal] = useState(() => {
    localStorage.clear();
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setVal];
}
