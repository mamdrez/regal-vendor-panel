
import { useEffect, useState } from "react";

const useStickyObserver = (ref: React.RefObject<HTMLDivElement>) => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
        
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isSticky;
};

export default useStickyObserver;