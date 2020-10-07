import { useState, useEffect } from 'react';

export default function useDebounce(value, wait) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, wait)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debounceValue;
}


