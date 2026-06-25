import type { FC } from "react";
import { Button, Icon, Input } from "@/shared/ui";
import type { ProductVariant } from "../types/product.types";
import styles from "./VariantEditor.module.css";

interface VariantEditorProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

const createVariant = (): ProductVariant => ({
  id: `var-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
  color: "",
  size: "",
  sku: "",
  stock: 0,
});

const VariantEditor: FC<VariantEditorProps> = ({ variants, onChange }) => {
  const update = (
    id: string,
    field: keyof Omit<ProductVariant, "id">,
    value: string,
  ) => {
    onChange(
      variants.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              [field]: field === "stock" ? Number(value) || 0 : value,
            }
          : variant,
      ),
    );
  };

  const remove = (id: string) => {
    onChange(variants.filter((variant) => variant.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <span className={styles.title}>تنوع‌ها (رنگ، سایز، موجودی)</span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          leadingIcon={<Icon name="plus" size={16} />}
          onClick={() => onChange([...variants, createVariant()])}
        >
          افزودن تنوع
        </Button>
      </div>

      {variants.length === 0 ? (
        <p className={styles.empty}>
          هنوز تنوعی اضافه نشده است. برای محصولات مد، رنگ و سایز اضافه کنید.
        </p>
      ) : (
        <div className={styles.rows}>
          {variants.map((variant) => (
            <div key={variant.id} className={styles.row}>
              <Input
                placeholder="رنگ"
                value={variant.color}
                onChange={(e) => update(variant.id, "color", e.target.value)}
              />
              <Input
                placeholder="سایز"
                value={variant.size}
                onChange={(e) => update(variant.id, "size", e.target.value)}
              />
              <Input
                placeholder="SKU"
                value={variant.sku}
                onChange={(e) => update(variant.id, "sku", e.target.value)}
                dir="ltr"
              />
              <Input
                type="number"
                min={0}
                placeholder="موجودی"
                value={variant.stock}
                onChange={(e) => update(variant.id, "stock", e.target.value)}
              />
              <button
                type="button"
                className={styles.remove}
                onClick={() => remove(variant.id)}
                aria-label="حذف تنوع"
              >
                <Icon name="trash" size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariantEditor;
