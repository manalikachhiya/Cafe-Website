import { useState, useEffect } from "react";

// Generic hook to sync a piece of React state with localStorage.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("useLocalStorage write failed", err);
    }
  }, [key, value]);

  return [value, setValue];
}
