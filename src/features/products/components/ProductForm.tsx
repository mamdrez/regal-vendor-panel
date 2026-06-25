import { useState, type FC, type FormEvent } from "react";
import {
  Button,
  Card,
  ImageUploader,
  Input,
  Select,
  Textarea,
} from "@/shared/ui";
import { CATEGORIES } from "@/shared/constants/catalog";
import {
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_ORDER,
} from "../constants/productMeta";
import type { ProductFormValues } from "../types/product.types";
import VariantEditor from "./VariantEditor";
import styles from "./ProductForm.module.css";

interface ProductFormProps {
  initialValues: ProductFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}

type FieldErrors = Partial<Record<keyof ProductFormValues, string>>;

const categoryOptions = CATEGORIES.map((category) => ({
  value: category.label,
  label: category.label,
}));

const statusOptions = PRODUCT_STATUS_ORDER.map((status) => ({
  value: status,
  label: PRODUCT_STATUS_LABELS[status],
}));

const validate = (values: ProductFormValues): FieldErrors => {
  const errors: FieldErrors = {};
  if (values.title.trim().length < 2) errors.title = "نام محصول را وارد کنید.";
  if (!values.brandName.trim()) errors.brandName = "برند را وارد کنید.";
  if (!values.categoryName.trim())
    errors.categoryName = "دسته‌بندی را انتخاب کنید.";
  if (!values.price || values.price <= 0)
    errors.price = "قیمت معتبر وارد کنید.";
  if (values.discountPrice && values.discountPrice >= values.price)
    errors.discountPrice = "قیمت با تخفیف باید کمتر از قیمت اصلی باشد.";
  return errors;
};

const ProductForm: FC<ProductFormProps> = ({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setField = <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Card padding="lg" className={styles.section}>
        <h2 className={styles.sectionTitle}>اطلاعات اصلی</h2>
        <div className={styles.grid}>
          <Input
            label="نام محصول"
            placeholder="مثلاً: مانتو کتان جلو باز"
            value={values.title}
            onChange={(e) => setField("title", e.target.value)}
            error={errors.title}
          />
          <Input
            label="برند"
            placeholder="مثلاً: Zara"
            value={values.brandName}
            onChange={(e) => setField("brandName", e.target.value)}
            error={errors.brandName}
          />
          <Select
            label="دسته‌بندی"
            placeholder="انتخاب دسته‌بندی"
            options={categoryOptions}
            value={values.categoryName}
            onChange={(e) => setField("categoryName", e.target.value)}
            error={errors.categoryName}
          />
          <Select
            label="وضعیت"
            options={statusOptions}
            value={values.status}
            onChange={(e) =>
              setField("status", e.target.value as ProductFormValues["status"])
            }
          />
        </div>
        <Textarea
          label="توضیحات"
          placeholder="توضیحی کوتاه درباره محصول..."
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </Card>

      <Card padding="lg" className={styles.section}>
        <h2 className={styles.sectionTitle}>قیمت‌گذاری</h2>
        <div className={styles.grid}>
          <Input
            label="قیمت (تومان)"
            type="number"
            min={0}
            placeholder="0"
            value={values.price || ""}
            onChange={(e) => setField("price", Number(e.target.value) || 0)}
            error={errors.price}
            dir="ltr"
          />
          <Input
            label="قیمت با تخفیف (اختیاری)"
            type="number"
            min={0}
            placeholder="0"
            value={values.discountPrice || ""}
            onChange={(e) =>
              setField(
                "discountPrice",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
            error={errors.discountPrice}
            dir="ltr"
          />
        </div>
      </Card>

      <Card padding="lg" className={styles.section}>
        <h2 className={styles.sectionTitle}>تصاویر محصول</h2>
        <ImageUploader
          value={values.images}
          onChange={(images) => setField("images", images)}
          max={6}
        />
      </Card>

      <Card padding="lg" className={styles.section}>
        <VariantEditor
          variants={values.variants}
          onChange={(variants) => setField("variants", variants)}
        />
      </Card>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          انصراف
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
