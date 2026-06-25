import { useState } from "react";

export type FilterState = {
  SortBy: string;
  TenderCats: number[] | null;
  AuctionCats: number[] | null;
  Regions: number[] | null;
  Buyers: number[] | null;
  OnTender: boolean | null;
  OnAuction: boolean | null;
  OnInquiry: boolean | null;
  Term: string | null;
  [key: string]: string | number[] | boolean | null | undefined;
};

export type StateType = Record<
  string,
  string | number | boolean | object | null | undefined
>;

export const useCustomState = <T extends StateType>(initialValue: T) => {
  const [customState, setCustomState] = useState<T>(initialValue);

  const updateState = <K extends keyof T>(
    keyOrObject: K | Partial<T>,
    value?: T[K]
  ) => {
    if (typeof keyOrObject === "object") {
      setCustomState((prev) => ({
        ...prev,
        ...keyOrObject,
      }));
    } else {
      if (typeof customState[keyOrObject] === "boolean") {
        setCustomState((prev) => ({
          ...prev,
          [keyOrObject]: !prev[keyOrObject],
        }));
      } else {
        setCustomState((prev) => ({
          ...prev,
          [keyOrObject]: value,
        }));
      }
    }
  };

  const toggleBoolean = <K extends keyof T>(key: K) => {
    if (typeof customState[key] === "boolean") {
      setCustomState((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      console.warn(`Property "${String(key)}" is not boolean.`);
    }
  };

  const resetState = () => {
    setCustomState(initialValue);
  };

  return { customState, updateState, toggleBoolean, resetState };
};
