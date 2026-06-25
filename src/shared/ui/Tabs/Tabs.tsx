import type { ReactElement, ReactNode } from "react";
import styles from "./Tabs.module.css";

export interface TabItem<TValue extends string> {
  value: TValue;
  label: ReactNode;
  description?: ReactNode;
}

interface TabsProps<TValue extends string> {
  items: TabItem<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
  ariaLabel?: string;
}

const Tabs = <TValue extends string>({
  items,
  value,
  onChange,
  ariaLabel,
}: TabsProps<TValue>): ReactElement => (
  <div className={styles.wrap}>
    <div className={styles.tabs} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(item.value)}
          >
            <span className={styles.label}>{item.label}</span>
            {item.description && (
              <span className={styles.description}>{item.description}</span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default Tabs;
