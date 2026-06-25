import { CSSProperties, FC } from "react";
import styles from "./styles.module.css";
import LoadingCircle from "@/shared/loading/LoadingCircle";

type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "submit"
  | "transparent"
  | "table" 
  | "black";

export interface IButtonProps {
  handleClick?: () => void;
  text: string;
  icon?: React.ReactNode;
  color: ButtonColor;
  iconSize?: number;
  disable?: boolean;
  isLoading?: boolean;
  lottiePrimary?: boolean;
  width?: number;
  height?: number;
  fontSize?: number;
  style?: CSSProperties;
  unitWidth?: string;
  borderRadius?: number;
}

const Button: FC<IButtonProps> = ({
  handleClick,
  text,
  icon,
  color,
  disable,
  isLoading,
  height,
  width,
  fontSize,
  style,
  unitWidth = "rem",
  borderRadius,
}) => {
  return (
    <button
      className={`${styles.btnContainer} ${styles[color]} ${
        disable && styles.disable
      }`}
      onClick={(e) => {
        e.stopPropagation();
        if (!disable) handleClick?.();
      }}
      style={{
        ...style,
        pointerEvents: isLoading ? "none" : "initial",
        width: `${width}${unitWidth}`,
        height: `${height}rem`,
        minHeight: `${height}rem`,
        fontSize: `${fontSize}rem`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {icon && icon}
      <span>
        {isLoading ? (
          <LoadingCircle type="tertiary" size={18} borderSize={3} />
        ) : (
          text
        )}
      </span>
    </button>
  );
};

export default Button;
