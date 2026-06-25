import type { FC } from "react";
import { Button, Icon, Input } from "@/shared/ui";
import type { ProductVariant } from "../types/product.types";
import styles from "./ProductVariantStockEditor.module.css";

interface ProductVariantStockEditorProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
  /** Suggested colors/sizes from the catalog item, used for quick-add. */
  availableColors?: string[];
  availableSizes?: string[];
}

const createVariant = (
  color = "",
  size = "",
): ProductVariant => ({
  id: `var-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
  color,
  size,
  sku: "",
  stock: 0,
});

const ProductVariantStockEditor: FC<ProductVariantStockEditorProps> = ({
  variants,
  onChange,
  availableColors = [],
  availableSizes = [],
}) => {
  const update = (
    id: string,
    field: keyof Omit<ProductVariant, "id">,
    value: string,
  ) => {
    onChange(
      variants.map((variant) => {
        if (variant.id !== id) return variant;
        if (field === "stock") {
          return { ...variant, stock: Number(value) || 0 };
        }
        if (field === "priceOverride") {
          return {
            ...variant,
            priceOverride: value ? Number(value) || 0 : undefined,
          };
        }
        return { ...variant, [field]: value };
      }),
    );
  };

  const remove = (id: string) => {
    onChange(variants.filter((variant) => variant.id !== id));
  };

  const add = (color = "", size = "") =>
    onChange([...variants, createVariant(color, size)]);

  const hasSuggestions = availableColors.length > 0 || availableSizes.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div>
          <span className={styles.title}>تنوع رنگ و سایز</span>
          <span className={styles.subtitle}>
            موجودی هر تنوع را که در انبار دارید مشخص کنید.
          </span>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          leadingIcon={<Icon name="plus" size={16} />}
          onClick={() => add()}
        >
          افزودن تنوع
        </Button>
      </div>

      {hasSuggestions && (
        <div className={styles.suggestions}>
          <span className={styles.suggestLabel}>افزودن سریع:</span>
          {availableColors.map((color) => (
            <button
              key={`c-${color}`}
              type="button"
              className={styles.chip}
              onClick={() => add(color, "")}
            >
              {color}
            </button>
          ))}
          {availableSizes.map((size) => (
            <button
              key={`s-${size}`}
              type="button"
              className={styles.chip}
              onClick={() => add("", size)}
            >
              سایز {size}
            </button>
          ))}
        </div>
      )}

      {variants.length === 0 ? (
        <p className={styles.empty}>
          هنوز تنوعی اضافه نشده است. رنگ و سایزهایی که موجود دارید را اضافه کنید.
        </p>
      ) : (
        <div className={styles.rows}>
          <div className={`${styles.row} ${styles.header}`}>
            <span>رنگ</span>
            <span>سایز</span>
            <span>SKU</span>
            <span>موجودی</span>
            <span>قیمت اختصاصی</span>
            <span />
          </div>
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
                placeholder="0"
                value={variant.stock || ""}
                onChange={(e) => update(variant.id, "stock", e.target.value)}
                dir="ltr"
              />
              <Input
                type="number"
                min={0}
                placeholder="اختیاری"
                value={variant.priceOverride ?? ""}
                onChange={(e) =>
                  update(variant.id, "priceOverride", e.target.value)
                }
                dir="ltr"
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

export default ProductVariantStockEditor;
