import { useEffect, useState } from "react";

export function useClientOnly<T>(callback: () => T): T | null {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    setValue(callback());
  }, [callback]);

  return value;
}
