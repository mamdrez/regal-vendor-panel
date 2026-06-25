import styles from "./css/TableShimmer.module.css";

interface TableShimmerProps {
  columns: Array<any>;
  hasActions?: boolean;
  paginationInfo?: boolean;
}

const TableShimmer: React.FC<TableShimmerProps> = ({
  columns,
  hasActions,
  paginationInfo,
}) => {
  const headerColumns = columns.length;
  return (
    <div className={styles.shimmerWrapper}>
      {/* Title Shimmer */}
      <div className={styles.shimmerTitle}></div>

      <div className={styles.tableWrapper}>
        {/* Header Row */}
        <div
          className={styles.headerRow}
          style={hasActions ? { paddingLeft: "7rem" } : {}}
        >
          {Array(headerColumns)
            .fill(0)
            .map((_, index) => (
              <div key={`header-${index}`} className={styles.headerCell}>
                <div
                  className={`${styles.shimmerEffect} ${styles.headerContent}`}
                ></div>
              </div>
            ))}
        </div>

        {/* Body Rows */}
        {Array(10)
          .fill(0)
          .map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className={styles.bodyRow}>
              {Array(columns.length)
                .fill(0)
                .map((_, colIndex) => (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={styles.bodyCell}
                  >
                    <div
                      className={`${styles.shimmerEffect} ${styles.cellContent}`}
                    ></div>
                  </div>
                ))}
              {hasActions && (
                <div className={styles.actionCell}>
                  <div className={styles.actionButtons}>
                    <div
                      className={`${styles.shimmerEffect} ${styles.circleShimmer}`}
                    ></div>
                    <div
                      className={`${styles.shimmerEffect} ${styles.circleShimmer}`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      {paginationInfo && (
        <div className={styles.paginatin}>
          <div
            className={`${styles.shimmerEffect} ${styles.paginationShimmer}`}
          ></div>
          <div
            className={`${styles.shimmerEffect} ${styles.paginationShimmer}`}
          ></div>
          <div
            className={`${styles.shimmerEffect} ${styles.paginationShimmer}`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TableShimmer;
