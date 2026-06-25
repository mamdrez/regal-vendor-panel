import type { FC } from "react";
import { Icon, type IconName } from "@/shared/ui";
import styles from "./StatCard.module.css";

export type StatTone = "primary" | "success" | "warning" | "danger" | "info";

interface StatCardProps {
  icon: IconName;
  label: string;
  value: string;
  tone?: StatTone;
  hint?: string;
}

const StatCard: FC<StatCardProps> = ({
  icon,
  label,
  value,
  tone = "primary",
  hint,
}) => (
  <div className={styles.card}>
    <span className={`${styles.iconBox} ${styles[tone]}`}>
      <Icon name={icon} size={20} />
    </span>
    <div className={styles.body}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  </div>
);

export default StatCard;
