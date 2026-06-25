import { useEffect, useState } from "react";

export const useDebounce = (callback: any, delay: number) => {
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (...args: any) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    setTimer(newTimer);
  };
};
