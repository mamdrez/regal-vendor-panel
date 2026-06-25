import type { FC, ReactNode } from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Right-aligned (in RTL) actions such as buttons. */
  actions?: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ title, description, actions }) => (
  <header className={styles.header}>
    <div className={styles.titleBlock}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
    {actions && <div className={styles.actions}>{actions}</div>}
  </header>
);

export default PageHeader;
