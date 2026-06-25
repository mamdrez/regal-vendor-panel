import type { FC } from "react";
import { Badge, Icon } from "@/shared/ui";
import {
  CATALOG_SOURCE_LABELS,
  CATALOG_SOURCE_TONES,
} from "../constants/productMeta";
import type { BrandCatalogItem } from "../types/product.types";
import CatalogThumb from "./CatalogThumb";
import styles from "./CatalogProductCard.module.css";

interface CatalogProductCardProps {
  item: BrandCatalogItem;
  selected: boolean;
  onSelect: (item: BrandCatalogItem) => void;
}

const CatalogProductCard: FC<CatalogProductCardProps> = ({
  item,
  selected,
  onSelect,
}) => (
  <button
    type="button"
    className={styles.card}
    data-selected={selected}
    onClick={() => onSelect(item)}
    aria-pressed={selected}
  >
    <div className={styles.thumbWrap}>
      <CatalogThumb images={item.images} alt={item.title} />
      <span className={styles.source}>
        <Badge tone={CATALOG_SOURCE_TONES[item.source]}>
          {CATALOG_SOURCE_LABELS[item.source]}
        </Badge>
      </span>
      {selected && (
        <span className={styles.check}>
          <Icon name="check" size={15} />
        </span>
      )}
    </div>

    <div className={styles.body}>
      <span className={styles.title}>{item.title}</span>
      <span className={styles.meta}>
        {item.brandName} · {item.categoryName}
      </span>
      {item.description && (
        <span className={styles.description}>{item.description}</span>
      )}
      <div className={styles.attrs}>
        {item.availableColors.length > 0 && (
          <span className={styles.attr}>
            {item.availableColors.length.toLocaleString("fa-IR")} رنگ
          </span>
        )}
        {item.availableSizes.length > 0 && (
          <span className={styles.attr}>
            {item.availableSizes.length.toLocaleString("fa-IR")} سایز
          </span>
        )}
      </div>
    </div>
  </button>
);

export default CatalogProductCard;
