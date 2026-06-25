import type { FC, ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";
import styles from "./ToastMessage.module.css";

export type ToastVariant = "success" | "error" | "info";

const VARIANT_ICON: Record<ToastVariant, IconName> = {
  success: "check",
  error: "alert-triangle",
  info: "bell",
};

interface ToastMessageProps {
  variant: ToastVariant;
  message: ReactNode;
}

/**
 * Branded toast content used with react-toastify: a compact, single-line
 * row with a small coloured icon and the message — consistent with the
 * Regal UI.
 */
const ToastMessage: FC<ToastMessageProps> = ({ variant, message }) => (
  <div className={styles.toast} data-variant={variant}>
    <span className={styles.icon}>
      <Icon name={VARIANT_ICON[variant]} size={14} strokeWidth={2.6} />
    </span>
    <span className={styles.message}>{message}</span>
  </div>
);

export default ToastMessage;
