import { forwardRef, type InputHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import styles from "./DateInput.module.css";

interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

/**
 * Lightweight date field built on the native date input (ISO yyyy-mm-dd value),
 * styled to match the rest of the form controls. No external date library.
 */
const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const fieldId = id ?? rest.name;
    return (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
          </label>
        )}
        <div
          className={[styles.wrapper, error ? styles.hasError : "", className ?? ""]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles.icon}>
            <Icon name="calendar" size={18} />
          </span>
          <input
            id={fieldId}
            ref={ref}
            type="date"
            className={styles.input}
            {...rest}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

DateInput.displayName = "DateInput";

export default DateInput;
