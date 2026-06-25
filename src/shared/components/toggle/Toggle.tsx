import { FC } from "react";
import styles from "./styles.module.css";

export type ToggleType = "default" | "red" | "purple" | "blue";
export type ToggleSize = "small" | "medium" | "large";

interface IProps {
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  type?: ToggleType;
  size?: ToggleSize;
  label?: string;
  disable?: boolean;
}

const Toggle: FC<IProps> = ({
  isOn,
  onToggle,
  type = "default",
  size = "medium",
  label,
  disable = false,
}) => {
  const handleToggle = () => {
    onToggle(!isOn);
  };

  return (
    <div
      className={`${styles.toggleContainer} ${disable ? styles.disable : ""}`}
    >
      {label && <span className={styles.labelToggle}>{label}</span>}
      <button
        disabled={disable}
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={handleToggle}
        className={`${styles.switch} ${styles[type]} ${styles[size]} ${
          isOn ? styles.on : styles.off
        }`}
        style={{ cursor: disable ? "not-allowed" : "pointer" }}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
};

export default Toggle;
