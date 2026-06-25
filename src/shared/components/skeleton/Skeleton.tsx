import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./style.module.css";

type SkeletonSize = number | string;

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: SkeletonSize;
  height?: SkeletonSize;
  borderRadius?: SkeletonSize;
}

const getSizeValue = (value?: SkeletonSize) => {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  borderRadius = 8,
  className,
  style,
  ...props
}) => {
  const skeletonStyle = {
    "--skeleton-width": getSizeValue(width),
    "--skeleton-height": getSizeValue(height),
    "--skeleton-radius": getSizeValue(borderRadius),
    ...style,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`${styles.skeleton} ${className || ""}`.trim()}
      style={skeletonStyle}
      {...props}
    />
  );
};

export default Skeleton;
