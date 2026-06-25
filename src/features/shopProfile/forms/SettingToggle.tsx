import type { FC } from "react";
import styles from "./forms.module.css";

interface SettingToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** A labelled on/off switch row, shared by the settings forms. */
const SettingToggle: FC<SettingToggleProps> = ({
  title,
  description,
  checked,
  onChange,
}) => (
  <div className={styles.toggleRow}>
    <span className={styles.toggleText}>
      <strong>{title}</strong>
      <span>{description}</span>
    </span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={title}
      className={`${styles.switch} ${checked ? styles.switchOn : ""}`}
      onClick={() => onChange(!checked)}
    />
  </div>
);

export default SettingToggle;
