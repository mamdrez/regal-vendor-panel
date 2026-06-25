import { useMemo } from "react";
import styles from "./style.module.css";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  minWidth?: number;
  type?: "fit" | "fill" | "stretch";
  rowGap?: number;
  columnGap?: number;
  columns?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

const AutoGrid: React.FC<IProps> = ({
  children,
  minWidth = 150,
  type = "fill",
  rowGap = 1,
  columnGap = 1,
  columns,
  className,
  ...props
}) => {
  // یک ID یونیک برای هر instance
  const uniqueId = useMemo(
    () => `grid-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const getGridTemplateColumns = () => {
    if (columns) {
      if (typeof columns === "number") {
        return `repeat(${columns}, 1fr)`;
      }
      return undefined;
    }
    return `repeat(auto-${type}, minmax(${minWidth}px, 1fr))`;
  };

  const getResponsiveStyles = () => {
    if (columns && typeof columns === "object") {
      const breakpoints = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      };

      let mediaQueries = "";

      // مرتب‌سازی بر اساس اندازه breakpoint
      const sortedEntries = Object.entries(columns).sort(
        ([keyA], [keyB]) =>
          breakpoints[keyA as keyof typeof breakpoints] -
          breakpoints[keyB as keyof typeof breakpoints]
      );

      sortedEntries.forEach(([key, value]) => {
        const breakpoint = breakpoints[key as keyof typeof breakpoints];
        if (value) {
          if (key === "xs") {
            mediaQueries += `
              .${uniqueId} {
                grid-template-columns: repeat(${value}, 1fr) !important;
              }
            `;
          } else {
            mediaQueries += `
              @media (min-width: ${breakpoint}px) {
                .${uniqueId} {
                  grid-template-columns: repeat(${value}, 1fr) !important;
                }
              }
            `;
          }
        }
      });

      return mediaQueries;
    }
    return "";
  };

  const combinedClassName = `${styles.grid} ${
    columns && typeof columns === "object" ? uniqueId : ""
  } ${className || ""}`.trim();

  return (
    <>
      {columns && typeof columns === "object" && (
        <style>{getResponsiveStyles()}</style>
      )}
      <div
        className={combinedClassName}
        style={{
          display: "grid",
          gridTemplateColumns: getGridTemplateColumns(),
          gap: `${rowGap}rem ${columnGap}rem`,
          ...props?.style,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default AutoGrid;