import { useEffect, useState, type FC } from "react";
import { Button, Input, Modal, Textarea } from "@/shared/ui";
import type { BranchFormValues } from "../types/shopProfile.types";
import styles from "./BranchFormModal.module.css";

interface BranchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BranchFormValues) => void;
  initialValues: BranchFormValues | null;
}

const emptyBranch: BranchFormValues = {
  name: "",
  city: "",
  province: "",
  address: "",
  phone: "",
  workingHours: "",
  location: "",
  isActive: true,
};

const BranchFormModal: FC<BranchFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [values, setValues] = useState<BranchFormValues>(emptyBranch);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues(initialValues ?? emptyBranch);
      setError(null);
    }
  }, [isOpen, initialValues]);

  const set = <K extends keyof BranchFormValues>(
    key: K,
    val: BranchFormValues[K],
  ) => setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!values.name.trim() || !values.city.trim()) {
      setError("نام شعبه و شهر الزامی است.");
      return;
    }
    onSubmit(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialValues ? "ویرایش شعبه" : "افزودن شعبه"}
      width={36}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            انصراف
          </Button>
          <Button onClick={handleSubmit}>
            {initialValues ? "ذخیره شعبه" : "افزودن شعبه"}
          </Button>
        </>
      }
    >
      <div className={styles.grid}>
        <Input
          label="نام شعبه"
          placeholder="مثلاً: شعبه مرکزی"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <Input
          label="شهر"
          placeholder="مثلاً: تهران"
          value={values.city}
          onChange={(e) => set("city", e.target.value)}
        />
        <Input
          label="استان"
          placeholder="مثلاً: تهران"
          value={values.province}
          onChange={(e) => set("province", e.target.value)}
        />
        <Input
          label="شماره تماس"
          placeholder="021xxxxxxxx"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          dir="ltr"
        />
        <Input
          label="ساعات کاری"
          placeholder="مثلاً: ۹ تا ۲۱"
          value={values.workingHours}
          onChange={(e) => set("workingHours", e.target.value)}
        />
        <Input
          label="موقعیت مکانی (اختیاری)"
          placeholder="لینک یا مختصات"
          value={values.location ?? ""}
          onChange={(e) => set("location", e.target.value)}
          dir="ltr"
        />
      </div>
      <Textarea
        label="آدرس کامل"
        placeholder="آدرس دقیق شعبه..."
        value={values.address}
        onChange={(e) => set("address", e.target.value)}
      />

      <label className={styles.activeRow}>
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => set("isActive", e.target.checked)}
        />
        <span>شعبه فعال است</span>
      </label>

      {error && <p className={styles.error}>{error}</p>}
    </Modal>
  );
};

export default BranchFormModal;
