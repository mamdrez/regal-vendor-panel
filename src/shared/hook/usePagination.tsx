import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState<number>(1);

  const handlePage = (value: number) => {
    setPage(value);
  };

  return { page, handlePage };
};
