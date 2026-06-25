import { FC, useState } from "react";
import styles from "./styles.module.css";
import Icons from "@/shared/icons";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: boolean;
  handleVisible?: () => void;
  handleFocus?: () => void;
  error?: string;
  fontFamily?: string;
  fontSize?: number;
  maxLength?: number;
  disabled?: boolean;
}

const Input: FC<IProps> = ({
  label,
  icon,
  handleVisible,
  handleFocus,
  error,
  fontFamily,
  fontSize,
  type,
  maxLength,
  disabled,
  ...inputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    if (type === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <div className={styles.contentInput}>
      {label && (
        <div className={styles.labelContainer}>
          <label>{label}</label>
          {error && (
            <div className={styles.errorContainer}>
              <span className={styles.error}>{error}</span>
            </div>
          )}
        </div>
      )}
      <div
        className={`${styles.inputWrapper} ${disabled ? styles.disabled : ""}`}
      >
        <input
          maxLength={maxLength}
          style={{
            fontFamily: fontFamily,
            fontWeight: fontFamily?.includes("vazir-number")
              ? "bold"
              : "normal",
            fontSize: `${fontSize}rem`,
            paddingLeft: type === "password" ? "3rem" : "inherit",
          }}
          onFocus={handleFocus}
          className={error ? styles.errorInput : ""}
          type={type === "password" && isPasswordVisible ? "text" : type}
          {...inputProps}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            <Icons
              name={!isPasswordVisible ? "eye" : "eye-slash"}
              size={24}
              color="#000"
              isFill
            />
          </button>
        )}
      </div>
      {icon && (
        <div className={styles.arrowBottom}>
          <Icons name="arrow-bottom" size={8} color="#000" isFill />
        </div>
      )}
    </div>
  );
};

export default Input;
