import React from "react";
import { createPortal } from "react-dom";
import styles from "./drawer.module.css";
import Icons from "@/shared/icons";
import IconBg from "@/shared/icons/IconBg";

// تعریف نوع‌های مجاز برای جهت
type Placement = "top" | "right" | "bottom" | "left";

interface IProp {
  open: boolean;
  onClose?: VoidFunction;
  children: any;
  icon?: any;
  title?: string;
  placement?: Placement;
  maxWidth?: number;
  maxHeight?: number;
  iconType?: "arrow" | "close";
  maxWidthUnit?: "rem" | "px" | "%";
}

const Drawer: React.FC<IProp> = ({
  open,
  onClose,
  children,
  icon,
  title,
  placement = "bottom",
  maxWidth = 400,
  maxHeight = 90,
  iconType = "close",
  maxWidthUnit = "px",
}) => {
  const placementClass = styles[placement] || styles.bottom;

  const drawerContent = (
    <div
      className={`${styles.drawer} ${
        open ? styles.open : ""
      } ${placementClass}`}
      onClick={() => open && onClose?.()}
    >
      <div
        className={styles.drawerDeep}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: ["left", "right"]?.includes(placement)
            ? `${maxWidth}${maxWidthUnit}`
            : "100%",
          width: ["left", "right"]?.includes(placement)
            ? `${maxWidth}${maxWidthUnit}`
            : "100%",
          maxHeight: ["top", "bottom"]?.includes(placement)
            ? `${maxHeight}svh`
            : "initial",
          height: ["top", "bottom"]?.includes(placement)
            ? `${maxHeight}svh`
            : "initial",
        }}
      >
        <div className={styles.drawerHeader}>
          <div className={styles.drawerHederFlex}>
            {icon}
            <span dangerouslySetInnerHTML={{ __html: title || "" }}></span>
          </div>
          <IconBg color="#ebedf0ff" borderRadius="8px" weight={2} height={2}>
            <Icons
              name={iconType === "close" ? "Close" : "Arrow-left"}
              color="#000000ff"
              size={20}
              onClick={onClose}
              cursor="pointer"
            />
          </IconBg>
        </div>
        <div className={styles.drawerContent}>{children}</div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;

  return createPortal(
    drawerContent,
    document.getElementById("root") || document.body
  );
};

export default Drawer;
