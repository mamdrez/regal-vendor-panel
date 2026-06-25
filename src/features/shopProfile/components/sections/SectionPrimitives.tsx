import type { FC, ReactNode } from "react";
import { Badge, Icon, type IconName } from "@/shared/ui";
import { EMPTY_VALUE_LABEL } from "../../utils/shopProfileLabels";
import styles from "./profileSections.module.css";

export const DetailItem: FC<{
  label: string;
  value?: ReactNode;
  dir?: "ltr" | "rtl";
}> = ({ label, value, dir }) => (
  <div className={styles.detailItem}>
    <span>{label}</span>
    <strong dir={dir}>{value || EMPTY_VALUE_LABEL}</strong>
  </div>
);

export const ChipList: FC<{ values: string[]; emptyText: string }> = ({
  values,
  emptyText,
}) =>
  values.length > 0 ? (
    <div className={styles.chipList}>
      {values.map((value) => (
        <span key={value} className={styles.chip}>
          {value}
        </span>
      ))}
    </div>
  ) : (
    <p className={styles.emptyInline}>{emptyText}</p>
  );

export const StatusRow: FC<{
  icon: IconName;
  title: string;
  description: string;
  enabled: boolean;
}> = ({ icon, title, description, enabled }) => (
  <div className={styles.statusRow}>
    <Icon name={icon} size={18} />
    <div>
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
    <Badge tone={enabled ? "success" : "neutral"}>
      {enabled ? "فعال" : "غیرفعال"}
    </Badge>
  </div>
);
