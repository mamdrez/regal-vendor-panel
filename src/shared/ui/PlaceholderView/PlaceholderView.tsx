import type { FC, ReactNode } from "react";
import PageHeader from "../PageHeader/PageHeader";
import EmptyState from "../EmptyState/EmptyState";
import styles from "./PlaceholderView.module.css";

interface PlaceholderViewProps {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  icon?: ReactNode;
}

/**
 * Premium empty-state scaffold shared by every Phase 1 placeholder page.
 * Real feature logic replaces the body in later phases.
 */
const PlaceholderView: FC<PlaceholderViewProps> = ({
  title,
  description,
  emptyTitle,
  emptyDescription,
  icon,
}) => (
  <div className={styles.page}>
    <PageHeader title={title} description={description} />
    <EmptyState title={emptyTitle} description={emptyDescription} icon={icon} />
  </div>
);

export default PlaceholderView;
