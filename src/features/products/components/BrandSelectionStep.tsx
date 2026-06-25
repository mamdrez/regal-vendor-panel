import { useMemo, useState, type FC } from "react";
import { EmptyState, LoadingState, SearchInput } from "@/shared/ui";
import { useShopProfile } from "@/features/shopProfile/hooks/useShopProfile";
import { useBrands } from "../hooks/useBrandCatalog";
import type { Brand } from "../types/product.types";
import BrandCard from "./BrandCard";
import styles from "./BrandSelectionStep.module.css";

interface BrandSelectionStepProps {
  selectedBrandId: string | null;
  onSelect: (brand: Brand) => void;
}

const BrandSelectionStep: FC<BrandSelectionStepProps> = ({
  selectedBrandId,
  onSelect,
}) => {
  const [search, setSearch] = useState("");
  const brandsQuery = useBrands(search);
  const profileQuery = useShopProfile();

  const soldBrandIds = profileQuery.data?.soldBrands ?? [];

  const { myBrands, otherBrands } = useMemo(() => {
    const brands = brandsQuery.data ?? [];
    const isSold = (brand: Brand) => soldBrandIds.includes(brand.id);
    return {
      myBrands: brands.filter(isSold),
      otherBrands: brands.filter((brand) => !isSold(brand)),
    };
    // soldBrandIds is derived from profileQuery.data — stable enough here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsQuery.data, profileQuery.data]);

  const renderGrid = (brands: Brand[]) => (
    <div className={styles.grid}>
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          selected={brand.id === selectedBrandId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.step}>
      <div className={styles.intro}>
        <h2 className={styles.title}>اول برند محصول را انتخاب کنید</h2>
        <p className={styles.description}>
          برندی را انتخاب کنید که محصول موردنظر شما متعلق به آن است.
        </p>
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="جستجوی برند..."
      />

      {brandsQuery.isLoading ? (
        <LoadingState label="در حال بارگذاری برندها..." />
      ) : brandsQuery.isError ? (
        <EmptyState
          title="خطا در دریافت برندها"
          description="مشکلی در بارگذاری برندها پیش آمد. دوباره تلاش کنید."
        />
      ) : (brandsQuery.data?.length ?? 0) === 0 ? (
        <EmptyState
          title="برندی پیدا نشد"
          description="برندی با این نام پیدا نشد. عبارت دیگری را امتحان کنید."
        />
      ) : (
        <div className={styles.sections}>
          {myBrands.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>برندهای شما</h3>
              {renderGrid(myBrands)}
            </section>
          )}
          <section className={styles.section}>
            {myBrands.length > 0 && (
              <h3 className={styles.sectionTitle}>سایر برندها</h3>
            )}
            {renderGrid(otherBrands)}
          </section>
        </div>
      )}
    </div>
  );
};

export default BrandSelectionStep;
