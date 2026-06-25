import type { FC } from "react";
import { Icon } from "@/shared/ui";
import type { Brand } from "../types/product.types";
import styles from "./BrandCard.module.css";

interface BrandCardProps {
  brand: Brand;
  selected: boolean;
  onSelect: (brand: Brand) => void;
}

const getInitial = (name: string): string =>
  name.trim().charAt(0).toUpperCase() || "?";

const BrandCard: FC<BrandCardProps> = ({ brand, selected, onSelect }) => (
  <button
    type="button"
    className={styles.card}
    data-selected={selected}
    onClick={() => onSelect(brand)}
    aria-pressed={selected}
  >
    <span className={styles.logo}>
      {brand.logo ? (
        <img src={brand.logo} alt={brand.name} className={styles.logoImage} />
      ) : (
        getInitial(brand.name)
      )}
    </span>
    <span className={styles.body}>
      <span className={styles.name}>{brand.name}</span>
      <span className={styles.category}>{brand.categoryName}</span>
      <span className={styles.description}>{brand.description}</span>
      <span className={styles.count}>
        {brand.itemCount.toLocaleString("fa-IR")} محصول در کاتالوگ
      </span>
    </span>
    {selected && (
      <span className={styles.check}>
        <Icon name="check" size={15} />
      </span>
    )}
  </button>
);

export default BrandCard;
