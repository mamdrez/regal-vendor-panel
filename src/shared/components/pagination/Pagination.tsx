import React from "react";
import styles from "./styles.module.css";
import Icons from "@/shared/icons";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPage - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPage - 2) {
      pages.push("...");
    }

    if (totalPage > 1) {
      pages.push(totalPage);
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icons name="Angle-right" color="#000" size={16} isFill />
      </button>

      <div className={styles.pageNumbers}>
        {/* {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageNumber} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </button>
        ))} */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`${styles.pageNumber} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() =>
              page !== "..." ? onPageChange?.(page as number) : undefined
            }
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.pageButton}
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPage || totalPage === 0}
      >
        <Icons name="Angle-left" color="#000" size={16} isFill />
      </button>
    </div>
  );
};

export default Pagination;
