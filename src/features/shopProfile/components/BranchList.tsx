import type { FC } from "react";
import { Badge, Button, EmptyState, Icon } from "@/shared/ui";
import type { ShopBranch } from "../types/shopProfile.types";
import styles from "./BranchList.module.css";

interface BranchListProps {
  branches: ShopBranch[];
  onAdd: () => void;
  onEdit: (branch: ShopBranch) => void;
  onToggle: (branch: ShopBranch) => void;
  onRemove: (branch: ShopBranch) => void;
}

const BranchList: FC<BranchListProps> = ({
  branches,
  onAdd,
  onEdit,
  onToggle,
  onRemove,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>اطلاعات مکانی و شعبات</h2>
        <p className={styles.subtitle}>
          شعب فیزیکی فروشگاه را به‌صورت کارت‌های قابل بررسی و مدیریت نمایش دهید.
        </p>
      </div>
      <Button
        variant="secondary"
        leadingIcon={<Icon name="plus" size={17} />}
        onClick={onAdd}
      >
        افزودن شعبه
      </Button>
    </div>

    {branches.length === 0 ? (
      <EmptyState
        icon={<Icon name="store" size={30} />}
        title="هنوز شعبه‌ای برای فروشگاه ثبت نشده است."
        description="در صورت داشتن فروشگاه فیزیکی، اولین شعبه را با آدرس، تلفن و ساعت کاری اضافه کنید."
        action={
          <Button variant="outline" onClick={onAdd}>
            افزودن اولین شعبه
          </Button>
        }
      />
    ) : (
      <div className={styles.grid}>
        {branches.map((branch) => (
          <article key={branch.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.branchName}>{branch.name}</h3>
                <p className={styles.city}>
                  {[branch.province, branch.city].filter(Boolean).join("، ")}
                </p>
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
        ))}
      </div>
    )}
  </div>
);

export default BranchList;
