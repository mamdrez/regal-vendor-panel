import type { FC } from "react";
import { Badge } from "@/shared/ui";
import { formatPrice } from "@/shared/utils/format";
import {
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_TONES,
  getVariantsStock,
} from "../constants/productMeta";
import type { BrandCatalogItem, SellingSetupValues } from "../types/product.types";
import SelectedCatalogProductPreview from "./SelectedCatalogProductPreview";
import styles from "./ReviewProductStep.module.css";

interface ReviewProductStepProps {
  catalogItem: BrandCatalogItem;
  selling: SellingSetupValues;
}

const ReviewProductStep: FC<ReviewProductStepProps> = ({
  catalogItem,
  selling,
}) => {
  const totalStock = getVariantsStock(selling.variants);

  return (
    <div className={styles.step}>
      <div className={styles.intro}>
        <h2 className={styles.title}>بررسی و ثبت نهایی</h2>
        <p className={styles.description}>
          پیش از افزودن محصول به فروشگاه، اطلاعات را یک بار مرور کنید.
        </p>
      </div>

      <SelectedCatalogProductPreview item={catalogItem} />

      <dl className={styles.summary}>
        <div className={styles.row}>
          <dt>قیمت فروش</dt>
          <dd>{formatPrice(selling.price)}</dd>
        </div>
        {selling.discountPrice ? (
          <div className={styles.row}>
            <dt>قیمت با تخفیف</dt>
            <dd>{formatPrice(selling.discountPrice)}</dd>
          </div>
        ) : null}
        <div className={styles.row}>
          <dt>وضعیت فروش</dt>
          <dd>
            <Badge tone={PRODUCT_STATUS_TONES[selling.status]}>
              {PRODUCT_STATUS_LABELS[selling.status]}
            </Badge>
          </dd>
        </div>
        <div className={styles.row}>
          <dt>موجودی کل</dt>
          <dd>{totalStock.toLocaleString("fa-IR")} عدد</dd>
        </div>
        {selling.sellerNote ? (
          <div className={styles.row}>
            <dt>یادداشت فروشنده</dt>
            <dd>{selling.sellerNote}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.variants}>
        <h3 className={styles.variantsTitle}>
          تنوع‌ها ({selling.variants.length.toLocaleString("fa-IR")})
        </h3>
        {selling.variants.length === 0 ? (
          <p className={styles.empty}>تنوعی ثبت نشده است.</p>
        ) : (
          <ul className={styles.variantList}>
            {selling.variants.map((variant) => (
              <li key={variant.id} className={styles.variantItem}>
                <span className={styles.variantName}>
                  {[variant.color, variant.size].filter(Boolean).join(" / ") ||
                    "تنوع"}
                </span>
                <span className={styles.variantStock}>
                  موجودی: {variant.stock.toLocaleString("fa-IR")}
                </span>
                {variant.priceOverride ? (
                  <span className={styles.variantPrice}>
                    {formatPrice(variant.priceOverride)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewProductStep;
