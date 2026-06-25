import { forwardRef, type SelectHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...rest }, ref) => {
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
          <select id={fieldId} ref={ref} className={styles.select} {...rest}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron}>
            <Icon name="chevron-down" size={16} />
          </span>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
