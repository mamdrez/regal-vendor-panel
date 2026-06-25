import { useEffect, useState } from "react";
import statusConfig from "./json/status.json";
import styles from "./styles.module.css";
import { numberSeparate } from "@/utils/utils";

interface IProps {
  width?: number;
  height?: number;
  type?: "badge" | "circle" | "selective" | "price" | "noBg";
  status: string;
  fontSize?: number;
  onClick?: () => void;
  active?: boolean;
}

const StatusColor: React.FC<IProps> = ({
  status,
  height,
  type = "badge",
  width,
  fontSize,
  onClick,
  active,
}) => {
  const [_, setSelected] = useState<boolean>(false);

  const isPriceType = type === "price";
  const priceValue = isPriceType ? parseFloat(status) : 0;
  const priceStatus = isPriceType
    ? priceValue > 0
      ? "true"
      : "false"
    : status;

  const config = statusConfig[priceStatus as keyof typeof statusConfig] || {};

  const badgeStyle = {
    backgroundColor: config?.bgColor,
    color: config?.colorCircle,
    width: width ? `${width}rem` : undefined,
    height: height ? `${height}rem` : undefined,
    fontSize: fontSize ? `${fontSize}rem` : undefined,
  };

  const noBgStyle = {
    backgroundColor: "transparent",
    color: config?.colorCircle,
    width: width ? `${width}rem` : undefined,
    height: height ? `${height}rem` : undefined,
    fontSize: fontSize ? `${fontSize}rem` : undefined,
    padding: "0",
  };

  const selectiveStyle = {
    backgroundColor: active ? config?.bgColor : "#f0f0f0",
    color: active ? config?.colorCircle : "#000000",
    width: width ? `${width}rem` : undefined,
    height: height ? `${height}rem` : undefined,
    fontSize: fontSize ? `${fontSize}rem` : undefined,
    border: active
      ? `1px solid ${config?.colorCircle}`
      : `1px solid transparent`,
  };

  const handleSelected = () => {
    if (type === "selective") {
      onClick?.();
    }
  };

  useEffect(() => {
    if (type === "selective") {
      setSelected(active || false);
    }
  }, [active]);

  const displayContent = isPriceType
    ? numberSeparate(status as any)
    : config?.title;

  return (
    <div
      className={styles.badge}
      style={
        type === "badge"
          ? badgeStyle
          : type === "selective"
          ? selectiveStyle
          : type === "price"
          ? badgeStyle
          : type === "noBg"
          ? noBgStyle
          : {
              fontSize: fontSize ? `${fontSize}rem` : undefined,
              width: width ? `${width}rem` : undefined,
              height: height ? `${height}rem` : undefined,
            }
      }
      onClick={handleSelected}
    >
      {type === "circle" && (
        <div
          className={styles.circle}
          style={{ backgroundColor: config?.colorCircle }}
        />
      )}
      {displayContent}
    </div>
  );
};

export default StatusColor;
