import type { FC } from "react";
import Icon from "@/shared/ui/Icon/Icon";
import styles from "./SelectableChip.module.css";

interface SelectableChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

const SelectableChip: FC<SelectableChipProps> = ({
  label,
  selected,
  onToggle,
}) => (
  <button
    type="button"
    className={`${styles.chip} ${selected ? styles.selected : ""}`}
    onClick={onToggle}
    aria-pressed={selected}
  >
    {selected && <Icon name="check" size={15} />}
    <span>{label}</span>
  </button>
);

export default SelectableChip;
