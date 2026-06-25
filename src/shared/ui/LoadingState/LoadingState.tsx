import type { FC } from "react";
import styles from "./LoadingState.module.css";

interface LoadingStateProps {
  /** Optional Persian label shown under the spinner. */
  label?: string;
  /** Render full-height (fills its container) instead of inline. */
  fullHeight?: boolean;
}

const LoadingState: FC<LoadingStateProps> = ({ label, fullHeight = false }) => (
  <div
    className={`${styles.wrapper} ${fullHeight ? styles.fullHeight : ""}`}
    role="status"
    aria-live="polite"
  >
    <span className={styles.spinner} aria-hidden="true" />
    {label && <span className={styles.label}>{label}</span>}
  </div>
);

export default LoadingState;
