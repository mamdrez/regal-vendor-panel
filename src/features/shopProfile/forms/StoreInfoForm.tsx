import type { FC } from "react";
import { ImageUploader, Input, Select, Textarea } from "@/shared/ui";
import type { ShopProfile, VendorType } from "../types/shopProfile.types";
import type { ProfileSectionFormProps } from "./formTypes";
import styles from "./forms.module.css";

const vendorTypeOptions = [
  { value: "brand_owner", label: "صاحب برند" },
  { value: "seller", label: "فروشنده محصولات برندهای دیگر" },
];

const StoreInfoForm: FC<ProfileSectionFormProps> = ({ value, onChange }) => {
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
          onChange={(event) =>
            set("vendorType", event.target.value as VendorType)
          }
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

export default StoreInfoForm;
