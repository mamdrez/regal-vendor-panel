import type { FC } from "react";
import { Button, EmptyState, Icon } from "@/shared/ui";
import type { ShopBranch } from "../types/shopProfile.types";
import BranchCard from "./BranchCard";
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
          <BranchCard
            key={branch.id}
            branch={branch}
            onEdit={onEdit}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    )}
  </div>
);

export default BranchList;
