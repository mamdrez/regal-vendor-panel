import { useEffect, useState } from "react";

/**
 * Tracks a max-width media query so charts can shrink axis widths,
 * fonts and tick density on small screens without horizontal overflow.
 */
export const useChartBreakpoint = (query = "(max-width: 640px)"): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
};
