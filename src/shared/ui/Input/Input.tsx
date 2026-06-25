import { forwardRef, useState, type InputHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, type = "text", className, id, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword && showPassword ? "text" : type;
    const inputId = id ?? rest.name;

    return (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
        <div
          className={[
            styles.inputWrapper,
            error ? styles.hasError : "",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            id={inputId}
            ref={ref}
            type={resolvedType}
            className={styles.input}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
            >
              <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
            </button>
          )}
        </div>
        {error ? (
          <span className={styles.error}>{error}</span>
        ) : hint ? (
          <span className={styles.hint}>{hint}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
