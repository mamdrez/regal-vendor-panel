import { useLayoutEffect, useState } from "react";

export const useDimension = () => {
  const [size, setSize] = useState<any>([]);
  useLayoutEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth,window,innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
};
