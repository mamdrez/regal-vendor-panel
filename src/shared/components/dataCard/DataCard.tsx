import { NestedAccessor } from "@/shared/components/table/types/table";
import styles from "./style.module.css";
import AutoGrid from "../grid/AutoGrid";

type SingleAccessor = NestedAccessor;
type MultipleAccessors = NestedAccessor[];

interface ConfigItem {
  accessor: SingleAccessor | MultipleAccessors;
  label: string;
  separator?: string;
  icon?: React.ReactNode;
  render?: (value: any, data?: any) => React.ReactNode;
}

interface IProps {
  data: any;
  config: ConfigItem[];
  minWidth?: number;
  isBackground?: boolean;
  title?: string;
  iconHeader?: React.ReactNode;
  columns?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  button?: React.ReactNode;
}

const getNestedValue = (obj: any, accessor: NestedAccessor): any => {
  if (typeof accessor === "string") {
    return obj?.[accessor];
  }
  return accessor.reduce(
    (current, key) =>
      current && current[key] !== undefined ? current?.[key] : undefined,
    obj
  );
};

const isMultipleAccessors = (
  accessor: SingleAccessor | MultipleAccessors
): accessor is MultipleAccessors => {
  return (
    Array.isArray(accessor) && accessor.length > 0 && Array.isArray(accessor[0])
  );
};

const DataCard: React.FC<IProps> = ({
  data,
  config,
  minWidth,
  isBackground = false,
  title,
  iconHeader,
  columns,
  button,
}) => {
  return (
    <div className={`${styles.dataCard} ${isBackground && styles.background}`}>
      {title && (
        <div className={styles.dataCardHeader}>
          <div className={styles.dataCardHeaderFlex}>
            {iconHeader && iconHeader}
            <span>{title}</span>
          </div>
          {button && button}
        </div>
      )}
      <AutoGrid
        className={`${styles.infoTableRow}`}
        minWidth={minWidth}
        columns={columns}
        columnGap={1}
        rowGap={1}
      >
        {config?.map((item, index) => {
          let value: any;

          if (isMultipleAccessors(item.accessor)) {
            const values = item.accessor
              .map((acc) => getNestedValue(data, acc))
              .filter(Boolean);
            value = values.join(item.separator || " ");
          } else {
            value = getNestedValue(data, item.accessor);
          }

          const displayValue = item.render
            ? item.render(value, data)
            : value || "-";

          return (
            <div key={index} className={styles.infoTableRowItem}>
              <p>
                {item?.icon && item?.icon}
                <span className={styles.label}>{item.label}</span>
              </p>
              <div className={styles.value}>{displayValue}</div>
            </div>
          );
        })}
      </AutoGrid>
    </div>
  );
};

export default DataCard;
