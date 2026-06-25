import type { FC, ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const Badge: FC<BadgeProps> = ({ children, tone = "neutral" }) => (
  <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>
);

export default Badge;
