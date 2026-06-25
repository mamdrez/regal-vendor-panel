import type { FC, ReactNode } from "react";
import Icon from "@/shared/ui/Icon/Icon";
import styles from "./VendorTypeOption.module.css";

interface VendorTypeOptionProps {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const VendorTypeOption: FC<VendorTypeOptionProps> = ({
  title,
  description,
  icon,
  selected,
  onSelect,
}) => (
  <button
    type="button"
    className={`${styles.option} ${selected ? styles.selected : ""}`}
    onClick={onSelect}
    aria-pressed={selected}
  >
    <span className={styles.iconBox}>{icon}</span>
    <span className={styles.text}>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </span>
    <span className={styles.check}>
      {selected && <Icon name="check" size={16} />}
    </span>
  </button>
);

export default VendorTypeOption;
