import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  children,
  className,
  disabled,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {!isLoading && leadingIcon && (
        <span className={styles.icon}>{leadingIcon}</span>
      )}
      <span className={isLoading ? styles.hiddenLabel : undefined}>
        {children}
      </span>
      {!isLoading && trailingIcon && (
        <span className={styles.icon}>{trailingIcon}</span>
      )}
    </button>
  );
};

export default Button;
