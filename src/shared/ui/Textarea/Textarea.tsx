import { forwardRef, type TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, rows = 4, ...rest }, ref) => {
    const fieldId = id ?? rest.name;
    return (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
          </label>
        )}
        <textarea
          id={fieldId}
          ref={ref}
          rows={rows}
          className={[styles.textarea, error ? styles.hasError : "", className ?? ""]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {error ? (
          <span className={styles.error}>{error}</span>
        ) : hint ? (
          <span className={styles.hint}>{hint}</span>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
