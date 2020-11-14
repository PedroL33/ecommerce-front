import { useState, useEffect } from 'react';

export default function useDebounce(value) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debounceValue;
}


