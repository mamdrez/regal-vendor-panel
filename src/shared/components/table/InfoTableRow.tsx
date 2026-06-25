import { NestedAccessor } from "@/shared/components/table/types/table";
import styles from "./css/styles.module.css";
import HTMLRender from "../htmlRender/HTMLRender";
import { ToastSuccess } from "@/utils/utils";
import useJalaliDate from "@/shared/hook/useJalaliDate";
import StatusColor from "../statusColor/StatusColor";
import FadeInImage from "../image/image";
import Icons from "@/shared/icons";

type SingleAccessor = NestedAccessor;
type MultipleAccessors = NestedAccessor[];

interface ConfigItem {
  accessor: SingleAccessor | MultipleAccessors;
  label: string;
  separator?: string;
  typeRender?: string;
  render?: (value: any, item: Record<string, any>) => React.ReactNode;
}

interface IProps {
  data: any;
  config: ConfigItem[];
}

const getNestedValue = (obj: any, accessor: NestedAccessor): any => {
  if (typeof accessor === "string") {
    return obj[accessor];
  }
  return accessor.reduce(
    (current, key) =>
      current && current[key] !== undefined ? current[key] : undefined,
    obj,
  );
};

const isMultipleAccessors = (
  accessor: SingleAccessor | MultipleAccessors,
): accessor is MultipleAccessors => {
  return (
    Array.isArray(accessor) && accessor.length > 0 && Array.isArray(accessor[0])
  );
};

const formatPrice = (value: number): string => value?.toLocaleString("fa-IR");

const formatDate = (isoDate: string) => {
  return useJalaliDate(isoDate)?.formattedDate();
};

const formatDateTime = (isoDate: string) => {
  return useJalaliDate(isoDate)?.formattedDateTime();
};

const formatDateTimeFa = (isoDate: string) => {
  return useJalaliDate(isoDate)?.formatFullFa();
};

const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber?.replace(/\D/g, "");
  const formatted = cleaned?.match(/.{1,4}/g);
  return formatted ? formatted.join("   ") : cardNumber;
};

const copyToClipboard = (value: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      ToastSuccess("کپی شد");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const InfoTableRow: React.FC<IProps> = ({ data, config }) => {
  const renderCellValue = (column: any, item: any) => {
    let value: any;

    if (isMultipleAccessors(column.accessor)) {
      const values = column.accessor
        .map((acc: any) => getNestedValue(data, acc))
        .filter(Boolean);
      value = values.join(column.separator || " ");
    } else {
      value = getNestedValue(data, column.accessor);
    }

    let renderedValue = value;

    if (column?.typeRender) {
      switch (column.typeRender) {
        case "price":
          renderedValue = formatPrice(value);
          break;
        case "date":
          renderedValue = formatDate(value);
          break;
        case "dateTime":
          renderedValue = formatDateTime(value);
          break;
        case "dateTimeFa":
          renderedValue = formatDateTimeFa(value);
          break;
        case "badge":
          renderedValue = <StatusColor status={value} fontSize={0.75} />;
          break;
        case "image":
          renderedValue = (
            <>
              {value === "logo-url" ? null : (
                <FadeInImage src={value} width={25} height={25} />
              )}
            </>
          );
          break;
        case "cardNo":
          renderedValue = (
            <div
              className={styles.cardNo}
              onClick={() => copyToClipboard(value)}
            >
              <span>{formatCardNumber(value)}</span>
              <Icons name="copy" color="#aaaaaaff" size={18} cursor="pointer" />
            </div>
          );
          break;
        case "html":
          renderedValue = <HTMLRender HTMLcontent={value || ""} />;
          break;
        case "copy":
          renderedValue = (
            <div className={styles.copy} onClick={() => copyToClipboard(value)}>
              <span>{value}</span>
              <Icons name="copy" color="#aaaaaaff" size={18} cursor="pointer" />
            </div>
          );
          break;
        default:
          renderedValue = value;
      }
    } else if (column.render) {
      renderedValue = column.render(value, item);
    }

    return renderedValue || "-";
  };

  return (
    <div className={styles.infoTableRow}>
      {config.map((item, index) => {
        let value: string | undefined;

        if (isMultipleAccessors(item.accessor)) {
          const values = item.accessor
            .map((acc) => getNestedValue(data, acc))
            .filter(Boolean);
          value = values.join(item.separator || " ");
        } else {
          value = getNestedValue(data, item.accessor);
        }

        return (
          <div key={index} className={styles.infoTableRowItem}>
            <span className={styles.label} key={value}>
              {item.label}
            </span>

            <div className={styles.value}>{renderCellValue(item, data)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoTableRow;
