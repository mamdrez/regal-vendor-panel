import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Icons from "@/shared/icons";

// interface Option {
//   value: number | string;
//   label: string;
// }

interface MultiSelectProps {
  options: any[];
  placeholder?: string;
  maxHeight?: number;
  onChange?: (selectedValues: any[]) => void;
  label?: string;
  error?: string;
  value?: any;
  valueKey: string;
  labelKey: string;
  disable?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "انتخاب کنید",
  maxHeight = 10,
  onChange,
  label = "لیبل",
  error,
  value,
  valueKey,
  labelKey,
  disable = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [availableOptions, setAvailableOptions] = useState<any[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      setSelectedItems(getConvertedValue(value));
    }

    if (options) {
      setAvailableOptions(options);
    }
  }, [value, options]);

  const getConvertedValue = (data: any) => {
    return data
      ?.map((item: any) => options?.find((i: any) => i[valueKey] === item))
      .filter((item: any): item is Record<string, any> => item !== undefined);
  };

  const getSelectedValues = (items: any[]): any[] => {
    return items.map((item) => item[valueKey]);
  };

  const handleSelect = (option: any): void => {
    if (!selectedItems.some((item) => item[valueKey] === option[valueKey])) {
      const newSelectedItems = [...selectedItems, option];
      setSelectedItems(newSelectedItems);
      setAvailableOptions(
        availableOptions.filter((item) => item[valueKey] !== option[valueKey])
      );
      setIsOpen(false);
      onChange?.(getSelectedValues(newSelectedItems));
    }
  };

  const removeItem = (option: any): void => {
    const newSelectedItems = selectedItems.filter(
      (item) => item[valueKey] !== option[valueKey]
    );
    setSelectedItems(newSelectedItems);
    setAvailableOptions(
      [...availableOptions, option].sort((a, b) =>
        String(a[valueKey]).localeCompare(String(b[valueKey]))
      )
    );
    onChange?.(getSelectedValues(newSelectedItems));
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {label && <label className={styles.dropdownLabel}>{label}</label>}
      <div className={styles.dropdownContainer}>
        <button
          onClick={() => !disable && setIsOpen(!isOpen)}
          className={`${styles.dropdownButton} ${isOpen ? styles.active : ""} ${
            error ? styles.errorInput : ""
          } ${disable ? styles.disable : ""}`}
          aria-expanded={isOpen}
          type="button"
        >
          <span>{placeholder}</span>
          <span
            className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}
          >
            <Icons name="Angle-down" color="#000" size={14.4} isFill />
          </span>
        </button>

        {isOpen && (
          <div
            className={styles.dropdownMenu}
            style={{ maxHeight: `${maxHeight}rem` }}
          >
            {availableOptions.length === 0 ? (
              <div className={styles.noOptions}>
                همه گزینه‌ها انتخاب شده است
              </div>
            ) : (
              availableOptions.map((option) => (
                <div
                  key={option[valueKey]}
                  onClick={() => handleSelect(option)}
                  className={styles.dropdownItem}
                >
                  {option[labelKey]}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.errorContainer}>
        {error && <span className={styles.error}>{error}</span>}
      </div>

      <div className={styles.selectedItems}>
        {selectedItems.map((item) => (
          <div key={item[valueKey]} className={styles.selectedTag}>
            <span>{item[labelKey]}</span>
            <button
              onClick={() => removeItem(item)}
              className={styles.removeButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
