import type { FC } from "react";
import { ChipMultiSelect } from "@/shared/ui";
import { BRANDS, CATEGORIES } from "@/shared/constants/catalog";
import type { ShopProfile } from "../types/shopProfile.types";
import type { ProfileSectionFormProps } from "./formTypes";
import styles from "./forms.module.css";

const categoryOptions = CATEGORIES.map((category) => ({
  value: category.id,
  label: category.label,
}));

const brandOptions = BRANDS.map((brand) => ({
  value: brand.id,
  label: brand.name,
}));

const BrandsCategoriesForm: FC<ProfileSectionFormProps> = ({
  value,
  onChange,
}) => {
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

export default BrandsCategoriesForm;
