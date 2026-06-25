import type { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card: FC<CardProps> = ({
  children,
  padding = "md",
  className,
  ...rest
}) => (
  <div
    className={[styles.card, styles[`pad-${padding}`], className ?? ""]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
