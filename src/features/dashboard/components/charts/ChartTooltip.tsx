import type { FC } from "react";
import styles from "./ChartTooltip.module.css";

export interface ChartTooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
}

interface ChartTooltipProps {
  /** Injected by Recharts when the tooltip is active. */
  active?: boolean;
  payload?: ChartTooltipEntry[];
  label?: string | number;
  /** Formats each series value (Persian numbers/prices). */
  valueFormatter?: (value: number, entry: ChartTooltipEntry) => string;
  /** Optional override for the heading label. */
  labelFormatter?: (label: string | number) => string;
  /** Hide the per-series name (useful for single-series charts). */
  hideName?: boolean;
}

const defaultValueFormatter = (value: number): string =>
  value.toLocaleString("fa-IR");

const ChartTooltip: FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter = defaultValueFormatter,
  labelFormatter,
  hideName = false,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const heading =
    labelFormatter && label !== undefined ? labelFormatter(label) : label;

  return (
    <div className={styles.tooltip} dir="rtl">
      {heading !== undefined && heading !== "" && (
        <span className={styles.label}>{heading}</span>
      )}
      <ul className={styles.list}>
        {payload.map((entry, index) => {
          const numericValue =
            typeof entry.value === "number" ? entry.value : Number(entry.value);
          return (
            <li key={`${entry.dataKey ?? entry.name ?? index}`} className={styles.row}>
              <span className={styles.dot} style={{ background: entry.color }} />
              {!hideName && entry.name && (
                <span className={styles.name}>{entry.name}</span>
              )}
              <span className={styles.value}>
                {Number.isFinite(numericValue)
                  ? valueFormatter(numericValue, entry)
                  : String(entry.value ?? "—")}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChartTooltip;
