import Icons from "@/shared/icons";
import styles from "./styles.module.css";
import { useState } from "react";

interface IProps {
  onClick?: (value: string) => void;
}
const ViewType: React.FC<IProps> = ({ onClick }) => {
  const [activeType, setActiveType] = useState<string>("table");

  const items = [
    { id: 1, title: "جدول", key: "table", icon: "Layout-3d" },
    { id: 2, title: "کارت", key: "grid", icon: "Layout-4-blocks" },
  ];

  const handleSetActive = (value: string) => {
    setActiveType(value);
    onClick?.(value);
  };
  return (
    <div className={styles.viewType}>
      {items?.map((i) => (
        <div
          key={i?.id}
          className={`${styles.viewTypeItem} ${
            activeType === i?.key && styles.active
          }`}
          onClick={() => handleSetActive(i?.key)}
        >
          <span>{i?.title}</span>
          <Icons
            name={i?.icon}
            color={activeType === i?.key ? "#000" : "#868686"}
            size={16}
            isFill
          />
        </div>
      ))}
    </div>
  );
};

export default ViewType;
