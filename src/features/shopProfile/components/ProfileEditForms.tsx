import type { FC } from "react";
import {
  ChipMultiSelect,
  ImageUploader,
  Input,
  Select,
  Textarea,
} from "@/shared/ui";
import { BRANDS, CATEGORIES } from "@/shared/constants/catalog";
import type {
  BranchFormValues,
  ShopProfile,
  VendorType,
} from "../types/shopProfile.types";
import styles from "./ProfileEditForms.module.css";

interface ProfileFormPartProps {
  value: ShopProfile;
  onChange: (next: ShopProfile) => void;
}

interface BranchFormProps {
  value: BranchFormValues;
  onChange: (next: BranchFormValues) => void;
  error?: string | null;
}

const vendorTypeOptions = [
  { value: "brand_owner", label: "صاحب برند" },
  { value: "seller", label: "فروشنده محصولات برندهای دیگر" },
];

const categoryOptions = CATEGORIES.map((category) => ({
  value: category.id,
  label: category.label,
}));

const brandOptions = BRANDS.map((brand) => ({
  value: brand.id,
  label: brand.name,
}));

export const StoreInfoForm: FC<ProfileFormPartProps> = ({ value, onChange }) => {
  const set = <K extends keyof ShopProfile>(key: K, val: ShopProfile[K]) =>
    onChange({ ...value, [key]: val });

  const isBrandOwner = value.vendorType === "brand_owner";

  return (
    <div className={styles.formStack}>
      <div className={styles.imageGrid}>
        <ImageUploader
          label="لوگو"
          value={value.logo ? [value.logo] : []}
          onChange={(images) => set("logo", images[0])}
          single
        />
        <ImageUploader
          label="تصویر کاور"
          value={value.coverImage ? [value.coverImage] : []}
          onChange={(images) => set("coverImage", images[0])}
          single
          variant="wide"
        />
      </div>

      <div className={styles.grid}>
        <Input
          label={isBrandOwner ? "نام برند" : "نام فروشگاه"}
          placeholder={isBrandOwner ? "نام برند شما" : "نام فروشگاه شما"}
          value={value.name}
          onChange={(event) => set("name", event.target.value)}
        />
        <Select
          label="نوع فعالیت"
          options={vendorTypeOptions}
          value={value.vendorType}
          onChange={(event) => set("vendorType", event.target.value as VendorType)}
        />
      </div>

      <Textarea
        label="معرفی کوتاه"
        placeholder="درباره سبک، محصولات و تجربه‌ای که ارائه می‌کنید بنویسید."
        value={value.description ?? ""}
        onChange={(event) => set("description", event.target.value)}
      />
    </div>
  );
};

export const ContactForm: FC<ProfileFormPartProps> = ({ value, onChange }) => {
  const set = <K extends keyof ShopProfile>(key: K, val: ShopProfile[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <div className={styles.grid}>
      <Input
        label="شماره تماس"
        placeholder="09xxxxxxxxx"
        value={value.phone ?? ""}
        onChange={(event) => set("phone", event.target.value)}
        dir="ltr"
      />
      <Input
        label="ایمیل"
        placeholder="shop@mail.com"
        value={value.email ?? ""}
        onChange={(event) => set("email", event.target.value)}
        dir="ltr"
      />
      <Input
        label="وب‌سایت"
        placeholder="https://"
        value={value.website ?? ""}
        onChange={(event) => set("website", event.target.value)}
        dir="ltr"
      />
    </div>
  );
};

export const SocialForm: FC<ProfileFormPartProps> = ({ value, onChange }) => {
  const set = <K extends keyof ShopProfile>(key: K, val: ShopProfile[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <div className={styles.grid}>
      <Input
        label="اینستاگرام"
        placeholder="@username"
        value={value.instagram ?? ""}
        onChange={(event) => set("instagram", event.target.value)}
        dir="ltr"
      />
      <Input
        label="وب‌سایت"
        placeholder="https://"
        value={value.website ?? ""}
        onChange={(event) => set("website", event.target.value)}
        dir="ltr"
      />
    </div>
  );
};

export const BrandsForm: FC<ProfileFormPartProps> = ({ value, onChange }) => {
  const set = <K extends keyof ShopProfile>(key: K, val: ShopProfile[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <div className={styles.formStack}>
      <ChipMultiSelect
        label="دسته‌بندی‌های فعالیت"
        options={categoryOptions}
        selected={value.categories}
        onChange={(categories) => set("categories", categories)}
      />
      {value.vendorType === "seller" && (
        <ChipMultiSelect
          label="برندهایی که می‌فروشید"
          options={brandOptions}
          selected={value.soldBrands}
          onChange={(soldBrands) => set("soldBrands", soldBrands)}
        />
      )}
    </div>
  );
};

export const BranchForm: FC<BranchFormProps> = ({ value, onChange, error }) => {
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
