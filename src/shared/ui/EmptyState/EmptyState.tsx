import type { FC, ReactNode } from "react";
import Logo from "../Logo/Logo";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.iconCircle}>
      {icon ?? <Logo size={34} color="var(--brand-burgundy)" />}
    </div>
    <h3 className={styles.title}>{title}</h3>
    {description && <p className={styles.description}>{description}</p>}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export default EmptyState;
