import type { FC } from "react";
import { SearchInput, Select } from "@/shared/ui";
import { CATEGORIES } from "@/shared/constants/catalog";
import {
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_ORDER,
} from "../constants/productMeta";
import type { ProductFilters as Filters } from "../types/product.types";
import styles from "./ProductFilters.module.css";

interface ProductFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const statusOptions = [
  { value: "all", label: "همه وضعیت‌ها" },
  ...PRODUCT_STATUS_ORDER.map((status) => ({
    value: status,
    label: PRODUCT_STATUS_LABELS[status],
  })),
];

const categoryOptions = [
  { value: "all", label: "همه دسته‌بندی‌ها" },
  ...CATEGORIES.map((category) => ({
    value: category.label,
    label: category.label,
  })),
];

const ProductFilters: FC<ProductFiltersProps> = ({ filters, onChange }) => (
  <div className={styles.bar}>
    <div className={styles.search}>
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search })}
        placeholder="جستجوی نام محصول یا برند..."
      />
    </div>
    <div className={styles.selects}>
      <Select
        aria-label="فیلتر بر اساس وضعیت"
        options={statusOptions}
        value={filters.status}
        onChange={(event) =>
          onChange({
            ...filters,
            status: event.target.value as Filters["status"],
          })
        }
      />
      <Select
        aria-label="فیلتر بر اساس دسته‌بندی"
        options={categoryOptions}
        value={filters.category}
        onChange={(event) =>
          onChange({ ...filters, category: event.target.value })
        }
      />
    </div>
  </div>
);

export default ProductFilters;
