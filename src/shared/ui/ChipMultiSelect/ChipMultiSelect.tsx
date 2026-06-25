import type { FC } from "react";
import Icon from "../Icon/Icon";
import styles from "./ChipMultiSelect.module.css";

export interface ChipOption {
  value: string;
  label: string;
}

interface ChipMultiSelectProps {
  label?: string;
  options: ChipOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  /** Persian message shown when there are no options. */
  emptyText?: string;
}

const ChipMultiSelect: FC<ChipMultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  emptyText,
}) => {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      {options.length === 0 && emptyText ? (
        <p className={styles.empty}>{emptyText}</p>
      ) : (
        <div className={styles.chips}>
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
                onClick={() => toggle(option.value)}
                aria-pressed={isSelected}
              >
                {isSelected && <Icon name="check" size={14} />}
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChipMultiSelect;
