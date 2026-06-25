import type { FC } from "react";
import { Badge, Button, Icon } from "@/shared/ui";
import type { ShopBranch } from "../types/shopProfile.types";
import { getBranchLocation } from "../utils/shopProfileMappers";
import styles from "./BranchCard.module.css";

interface BranchCardProps {
  branch: ShopBranch;
  onEdit: (branch: ShopBranch) => void;
  onToggle: (branch: ShopBranch) => void;
  onRemove: (branch: ShopBranch) => void;
}

const BranchCard: FC<BranchCardProps> = ({
  branch,
  onEdit,
  onToggle,
  onRemove,
}) => (
  <article className={styles.card}>
    <div className={styles.cardHeader}>
      <div>
        <h3 className={styles.branchName}>{branch.name}</h3>
        <p className={styles.city}>{getBranchLocation(branch)}</p>
      </div>
      <Badge tone={branch.isActive ? "success" : "neutral"}>
        {branch.isActive ? "فعال" : "غیرفعال"}
      </Badge>
    </div>

    <div className={styles.details}>
      <span>
        <Icon name="map-pin" size={16} />
        {branch.address || "آدرس ثبت نشده"}
      </span>
      <span>
        <Icon name="phone" size={16} />
        {branch.phone || "شماره تماس ثبت نشده"}
      </span>
      <span>
        <Icon name="clock" size={16} />
        {branch.workingHours || "ساعت کاری ثبت نشده"}
      </span>
      {branch.location && (
        <span dir="ltr">
          <Icon name="globe" size={16} />
          {branch.location}
        </span>
      )}
    </div>

    <div className={styles.actions}>
      <Button
        variant="outline"
        size="sm"
        leadingIcon={<Icon name="edit" size={15} />}
        onClick={() => onEdit(branch)}
      >
        ویرایش
      </Button>
      <Button
        variant="ghost"
        size="sm"
        leadingIcon={<Icon name="power" size={15} />}
        onClick={() => onToggle(branch)}
      >
        {branch.isActive ? "غیرفعال‌سازی" : "فعال‌سازی"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        leadingIcon={<Icon name="trash" size={15} />}
        onClick={() => onRemove(branch)}
        className={styles.removeButton}
      >
        حذف
      </Button>
    </div>
  </article>
);

export default BranchCard;
