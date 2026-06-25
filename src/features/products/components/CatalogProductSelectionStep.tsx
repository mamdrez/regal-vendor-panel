import { useState, type FC } from "react";
import {
  Button,
  EmptyState,
  Icon,
  LoadingState,
  SearchInput,
  Select,
} from "@/shared/ui";
import { CATEGORIES } from "@/shared/constants/catalog";
import { useBrandCatalogItems } from "../hooks/useBrandCatalog";
import type { Brand, BrandCatalogItem } from "../types/product.types";
import CatalogProductCard from "./CatalogProductCard";
import styles from "./CatalogProductSelectionStep.module.css";

interface CatalogProductSelectionStepProps {
  brand: Brand;
  selectedItemId: string | null;
  onSelect: (item: BrandCatalogItem) => void;
  onManualCreate: () => void;
}

const categoryOptions = [
  { value: "all", label: "همه دسته‌بندی‌ها" },
  ...CATEGORIES.map((category) => ({
    value: category.label,
    label: category.label,
  })),
];

const CatalogProductSelectionStep: FC<CatalogProductSelectionStepProps> = ({
  brand,
  selectedItemId,
  onSelect,
  onManualCreate,
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const itemsQuery = useBrandCatalogItems({
    brandId: brand.id,
    search,
    category,
  });

  const items = itemsQuery.data ?? [];

  return (
    <div className={styles.step}>
      <div className={styles.intro}>
        <h2 className={styles.title}>
          محصول موردنظر را از کاتالوگ برند انتخاب کنید
        </h2>
        <p className={styles.description}>
          محصولی را که قصد فروش آن را دارید از کاتالوگ «{brand.name}» جستجو و
          انتخاب کنید.
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchCol}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="جستجوی محصول..."
          />
        </div>
        <Select
          options={categoryOptions}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="فیلتر دسته‌بندی"
        />
      </div>

      {itemsQuery.isLoading ? (
        <LoadingState label="در حال بارگذاری محصولات..." />
      ) : itemsQuery.isError ? (
        <EmptyState
          title="خطا در دریافت محصولات"
          description="مشکلی در بارگذاری کاتالوگ پیش آمد. دوباره تلاش کنید."
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="محصولی پیدا نشد"
          description="محصولی برای این برند پیدا نشد. اگر محصول در کاتالوگ نیست، می‌توانید آن را دستی اضافه کنید."
          action={
            <Button
              variant="outline"
              leadingIcon={<Icon name="plus" size={18} />}
              onClick={onManualCreate}
            >
              محصولم را در کاتالوگ پیدا نکردم
            </Button>
          }
        />
      ) : (
        <>
          <div className={styles.grid}>
            {items.map((item) => (
              <CatalogProductCard
                key={item.id}
                item={item}
                selected={item.id === selectedItemId}
                onSelect={onSelect}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.manualLink}
            onClick={onManualCreate}
          >
            محصولم را در کاتالوگ پیدا نکردم
          </button>
        </>
      )}
    </div>
  );
};

export default CatalogProductSelectionStep;
