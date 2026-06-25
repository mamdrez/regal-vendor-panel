import React, { CSSProperties, ReactNode } from "react";
interface IProps {
  children: ReactNode;
  height?: number;
  weight?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
  borderRadius?: string;
  minWidth?: number;
  isLoading?: boolean;
  style?: CSSProperties;
}

const IconBg: React.FC<IProps> = ({
  children,
  height = 2.5,
  weight = 2.5,
  onClick,
  color = "secondary",
  className,
  borderRadius,
  isLoading,
  style,
}) => {
  return (
    <div
      style={{
        ...style,
        width: `${weight}rem`,
        minWidth: `${weight}rem`,
        height: `${height}rem`,
        backgroundColor: `${color}`,
        borderRadius: borderRadius ?? "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: isLoading ? "none" : "auto",
        cursor: onClick ? "pointer" : "auto",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick && !isLoading) onClick();
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default IconBg;
