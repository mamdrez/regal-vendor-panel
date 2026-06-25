import type { FC } from "react";
import { Input, Select, Textarea } from "@/shared/ui";
import {
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_ORDER,
} from "../constants/productMeta";
import type {
  ProductStatus,
  ProductVariant,
  SellingSetupValues,
} from "../types/product.types";
import ProductVariantStockEditor from "./ProductVariantStockEditor";
import styles from "./VendorProductSellingForm.module.css";

export type SellingFieldErrors = Partial<
  Record<"price" | "discountPrice" | "variants", string>
>;

interface VendorProductSellingFormProps {
  values: SellingSetupValues;
  onChange: (values: SellingSetupValues) => void;
  errors?: SellingFieldErrors;
  availableColors?: string[];
  availableSizes?: string[];
}

const statusOptions = PRODUCT_STATUS_ORDER.map((status) => ({
  value: status,
  label: PRODUCT_STATUS_LABELS[status],
}));

const VendorProductSellingForm: FC<VendorProductSellingFormProps> = ({
  values,
  onChange,
  errors = {},
  availableColors,
  availableSizes,
}) => {
  const set = <K extends keyof SellingSetupValues>(
    field: K,
    value: SellingSetupValues[K],
  ) => onChange({ ...values, [field]: value });

  return (
    <div className={styles.form}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>قیمت و وضعیت فروش</h3>
        <div className={styles.grid}>
          <Input
            label="قیمت فروش (تومان)"
            type="number"
            min={0}
            placeholder="0"
            value={values.price || ""}
            onChange={(e) => set("price", Number(e.target.value) || 0)}
            error={errors.price}
            dir="ltr"
          />
          <Input
            label="قیمت با تخفیف (اختیاری)"
            type="number"
            min={0}
            placeholder="0"
            value={values.discountPrice ?? ""}
            onChange={(e) =>
              set(
                "discountPrice",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
            error={errors.discountPrice}
            dir="ltr"
          />
          <Select
            label="وضعیت فروش"
            options={statusOptions}
            value={values.status}
            onChange={(e) => set("status", e.target.value as ProductStatus)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <ProductVariantStockEditor
          variants={values.variants}
          onChange={(variants: ProductVariant[]) => set("variants", variants)}
          availableColors={availableColors}
          availableSizes={availableSizes}
        />
        {errors.variants && <p className={styles.error}>{errors.variants}</p>}
      </section>

      <section className={styles.section}>
        <Textarea
          label="یادداشت فروشنده (اختیاری)"
          placeholder="مثلاً: ارسال از تهران، آماده ارسال فوری..."
          value={values.sellerNote ?? ""}
          onChange={(e) => set("sellerNote", e.target.value || undefined)}
        />
      </section>
    </div>
  );
};

export default VendorProductSellingForm;
