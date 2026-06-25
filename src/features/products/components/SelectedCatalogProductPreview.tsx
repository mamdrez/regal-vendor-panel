import type { FC } from "react";
import { Badge } from "@/shared/ui";
import {
  CATALOG_SOURCE_LABELS,
  CATALOG_SOURCE_TONES,
} from "../constants/productMeta";
import type { BrandCatalogItem } from "../types/product.types";
import CatalogThumb from "./CatalogThumb";
import styles from "./SelectedCatalogProductPreview.module.css";

interface SelectedCatalogProductPreviewProps {
  item: BrandCatalogItem;
  /** Optional action shown on the side (e.g. change product). */
  action?: React.ReactNode;
}

/** Read-only summary of the selected catalog product (its global identity). */
const SelectedCatalogProductPreview: FC<SelectedCatalogProductPreviewProps> = ({
  item,
  action,
}) => (
  <div className={styles.card}>
    <CatalogThumb images={item.images} alt={item.title} size="lg" />
    <div className={styles.body}>
      <div className={styles.head}>
        <span className={styles.title}>{item.title}</span>
        <Badge tone={CATALOG_SOURCE_TONES[item.source]}>
          {CATALOG_SOURCE_LABELS[item.source]}
        </Badge>
      </div>
      <span className={styles.meta}>
        {item.brandName} · {item.categoryName}
      </span>
      {item.description && (
        <p className={styles.description}>{item.description}</p>
      )}
      <div className={styles.attrs}>
        {item.availableColors.length > 0 && (
          <span className={styles.attr}>
            رنگ‌ها: {item.availableColors.join("، ")}
          </span>
        )}
        {item.availableSizes.length > 0 && (
          <span className={styles.attr}>
            سایزها: {item.availableSizes.join("، ")}
          </span>
        )}
      </div>
    </div>
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export default SelectedCatalogProductPreview;
