"use client";

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        setValue(JSON.parse(storedValue));
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        // Optionally, remove the corrupted item or revert to default
        localStorage.removeItem(key);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Only re-run if key changes (which it shouldn't in this app's usage)

  // Update localStorage when value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageState;
