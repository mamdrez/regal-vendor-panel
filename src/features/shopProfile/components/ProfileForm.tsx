import type { FC } from "react";
import {
  Card,
  ChipMultiSelect,
  ImageUploader,
  Input,
  Select,
  Textarea,
} from "@/shared/ui";
import { BRANDS, CATEGORIES } from "@/shared/constants/catalog";
import type { ShopProfile, VendorType } from "../types/shopProfile.types";
import styles from "./ProfileForm.module.css";

interface ProfileFormProps {
  value: ShopProfile;
  onChange: (next: ShopProfile) => void;
}

const vendorTypeOptions = [
  { value: "brand_owner", label: "صاحب برند" },
  { value: "seller", label: "فروشنده (محصولات برندهای دیگر)" },
];

const categoryOptions = CATEGORIES.map((c) => ({ value: c.id, label: c.label }));
const brandOptions = BRANDS.map((b) => ({ value: b.id, label: b.name }));

const ProfileForm: FC<ProfileFormProps> = ({ value, onChange }) => {
  const set = <K extends keyof ShopProfile>(key: K, val: ShopProfile[K]) =>
    onChange({ ...value, [key]: val });

  const isBrandOwner = value.vendorType === "brand_owner";

  return (
    <div className={styles.wrapper}>
      <Card padding="lg" className={styles.section}>
        <h2 className={styles.sectionTitle}>هویت فروشگاه</h2>
        <div className={styles.imagesRow}>
          <ImageUploader
            label="لوگو"
            value={value.logo ? [value.logo] : []}
            onChange={(imgs) => set("logo", imgs[0])}
            single
          />
          <ImageUploader
            label="تصویر کاور"
            value={value.coverImage ? [value.coverImage] : []}
            onChange={(imgs) => set("coverImage", imgs[0])}
            single
            variant="wide"
          />
        </div>

        <div className={styles.grid}>
          <Input
            label={isBrandOwner ? "نام برند" : "نام فروشگاه"}
            placeholder={isBrandOwner ? "نام برند شما" : "نام فروشگاه شما"}
            value={value.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <Select
            label="نوع فعالیت"
            options={vendorTypeOptions}
            value={value.vendorType}
            onChange={(e) => set("vendorType", e.target.value as VendorType)}
          />
        </div>

        <Textarea
          label="توضیحات"
          placeholder={
            isBrandOwner
              ? "درباره برند خود بنویسید..."
              : "درباره فروشگاه خود بنویسید..."
          }
          value={value.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
        />
      </Card>

      <Card padding="lg" className={styles.section}>
        <h2 className={styles.sectionTitle}>راه‌های ارتباطی</h2>
        <div className={styles.grid}>
          <Input
            label="شماره تماس"
            placeholder="09xxxxxxxxx"
            value={value.phone ?? ""}
            onChange={(e) => set("phone", e.target.value)}
            dir="ltr"
          />
          <Input
            label="ایمیل"
            placeholder="shop@mail.com"
            value={value.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            dir="ltr"
          />
          <Input
            label="وب‌سایت"
            placeholder="https://"
            value={value.website ?? ""}
            onChange={(e) => set("website", e.target.value)}
            dir="ltr"
          />
          <Input
            label="اینستاگرام"
            placeholder="@username"
            value={value.instagram ?? ""}
            onChange={(e) => set("instagram", e.target.value)}
            dir="ltr"
          />
        </div>
      </Card>

      <Card padding="lg" className={styles.section}>
        <h2 className={styles.sectionTitle}>دسته‌بندی فعالیت</h2>
        <ChipMultiSelect
          label="دسته‌بندی‌هایی که در آن فعالیت می‌کنید"
          options={categoryOptions}
          selected={value.categories}
          onChange={(categories) => set("categories", categories)}
        />
        {!isBrandOwner && (
          <ChipMultiSelect
            label="برندهایی که می‌فروشید"
            options={brandOptions}
            selected={value.soldBrands}
            onChange={(soldBrands) => set("soldBrands", soldBrands)}
          />
        )}
      </Card>
    </div>
  );
};

export default ProfileForm;
