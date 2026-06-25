import type { FC } from "react";
import { Input, Textarea } from "@/shared/ui";
import type { BranchFormValues } from "../types/shopProfile.types";
import styles from "./forms.module.css";

interface BranchFormProps {
  value: BranchFormValues;
  onChange: (next: BranchFormValues) => void;
  error?: string | null;
}

const BranchForm: FC<BranchFormProps> = ({ value, onChange, error }) => {
  const set = <K extends keyof BranchFormValues>(
    key: K,
    val: BranchFormValues[K],
  ) => onChange({ ...value, [key]: val });

  return (
    <div className={styles.formStack}>
      <div className={styles.grid}>
        <Input
          label="نام شعبه"
          placeholder="مثلا: شعبه مرکزی"
          value={value.name}
          onChange={(event) => set("name", event.target.value)}
        />
        <Input
          label="شهر"
          placeholder="مثلا: تهران"
          value={value.city}
          onChange={(event) => set("city", event.target.value)}
        />
        <Input
          label="استان"
          placeholder="مثلا: تهران"
          value={value.province}
          onChange={(event) => set("province", event.target.value)}
        />
        <Input
          label="شماره تماس"
          placeholder="021xxxxxxxx"
          value={value.phone}
          onChange={(event) => set("phone", event.target.value)}
          dir="ltr"
        />
        <Input
          label="ساعات کاری"
          placeholder="مثلا: ۹ تا ۲۱"
          value={value.workingHours}
          onChange={(event) => set("workingHours", event.target.value)}
        />
        <Input
          label="موقعیت مکانی"
          placeholder="لینک یا مختصات"
          value={value.location ?? ""}
          onChange={(event) => set("location", event.target.value)}
          dir="ltr"
        />
      </div>

      <Textarea
        label="آدرس کامل"
        placeholder="آدرس دقیق شعبه را وارد کنید."
        value={value.address}
        onChange={(event) => set("address", event.target.value)}
      />

      <label className={styles.checkRow}>
        <input
          type="checkbox"
          checked={value.isActive}
          onChange={(event) => set("isActive", event.target.checked)}
        />
        <span>این شعبه فعال است</span>
      </label>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default BranchForm;
