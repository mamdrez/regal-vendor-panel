import { useState, type FC } from "react";
import { Badge, Button, Card, EmptyState, Icon } from "@/shared/ui";
import BranchFormModal from "./BranchFormModal";
import type {
  BranchFormValues,
  ShopBranch,
} from "../types/shopProfile.types";
import styles from "./BranchManager.module.css";

interface BranchManagerProps {
  branches: ShopBranch[];
  onChange: (branches: ShopBranch[]) => void;
}

const createId = (): string =>
  `branch-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const BranchCard: FC<{
  branch: ShopBranch;
  onEdit: () => void;
  onToggle: () => void;
  onRemove: () => void;
}> = ({ branch, onEdit, onToggle, onRemove }) => (
  <Card padding="md" className={styles.card}>
    <div className={styles.cardHead}>
      <div className={styles.cardTitleBlock}>
        <span className={styles.cardName}>{branch.name}</span>
        <Badge tone={branch.isActive ? "success" : "neutral"}>
          {branch.isActive ? "فعال" : "غیرفعال"}
        </Badge>
      </div>
      <div className={styles.cardActions}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onEdit}
          title="ویرایش"
          aria-label="ویرایش شعبه"
        >
          <Icon name="edit" size={16} />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onToggle}
          title={branch.isActive ? "غیرفعال‌سازی" : "فعال‌سازی"}
          aria-label="تغییر وضعیت شعبه"
        >
          <Icon name="power" size={16} />
        </button>
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.danger}`}
          onClick={onRemove}
          title="حذف"
          aria-label="حذف شعبه"
        >
          <Icon name="trash" size={16} />
        </button>
      </div>
    </div>

    <div className={styles.cardRows}>
      <span className={styles.row}>
        <Icon name="map-pin" size={15} />
        {[branch.province, branch.city, branch.address]
          .filter(Boolean)
          .join("، ") || "آدرس ثبت نشده"}
      </span>
      {branch.phone && (
        <span className={styles.row}>
          <Icon name="phone" size={15} />
          {branch.phone}
        </span>
      )}
      {branch.workingHours && (
        <span className={styles.row}>
          <Icon name="clock" size={15} />
          {branch.workingHours}
        </span>
      )}
    </div>
  </Card>
);

const BranchManager: FC<BranchManagerProps> = ({ branches, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = branches.find((b) => b.id === editingId) ?? null;
  const initialValues: BranchFormValues | null = editing
    ? {
        name: editing.name,
        city: editing.city,
        province: editing.province,
        address: editing.address,
        phone: editing.phone,
        workingHours: editing.workingHours,
        location: editing.location,
        isActive: editing.isActive,
      }
    : null;

  const openAdd = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleSubmit = (values: BranchFormValues) => {
    if (editingId) {
      onChange(
        branches.map((b) => (b.id === editingId ? { ...b, ...values } : b)),
      );
    } else {
      onChange([...branches, { ...values, id: createId() }]);
    }
    setIsModalOpen(false);
  };

  const toggle = (id: string) =>
    onChange(
      branches.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)),
    );

  const remove = (id: string) =>
    onChange(branches.filter((b) => b.id !== id));

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>شعب فروشگاه</h2>
          <p className={styles.subtitle}>
            شعب فیزیکی فروشگاه خود را مدیریت کنید.
          </p>
        </div>
        <Button
          variant="secondary"
          leadingIcon={<Icon name="plus" size={18} />}
          onClick={openAdd}
        >
          افزودن شعبه
        </Button>
      </div>

      {branches.length === 0 ? (
        <EmptyState
          icon={<Icon name="store" size={30} />}
          title="هنوز شعبه‌ای ثبت نشده است"
          description="اگر فروشگاه فیزیکی دارید، شعب خود را اضافه کنید."
          action={
            <Button variant="outline" onClick={openAdd}>
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
              onEdit={() => openEdit(branch.id)}
              onToggle={() => toggle(branch.id)}
              onRemove={() => remove(branch.id)}
            />
          ))}
        </div>
      )}

      <BranchFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default BranchManager;
