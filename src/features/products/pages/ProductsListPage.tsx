import { useMemo, useState, type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  EmptyState,
  Icon,
  LoadingState,
  Modal,
  PageHeader,
  Tabs,
} from "@/shared/ui";
import { paths } from "@/routers/paths";
import ProductFilters from "../components/ProductFilters";
import ProductsList from "../components/ProductsList";
import { getTotalStock } from "../constants/productMeta";
import { useProducts } from "../hooks/useProducts";
import {
  useDeleteProduct,
  useSetProductStatus,
} from "../hooks/useProductMutations";
import type { Product, ProductFilters as Filters } from "../types/product.types";
import styles from "./ProductsListPage.module.css";

const initialFilters: Filters = { search: "", status: "all", category: "all" };
type ProductTab = "all" | "inventory" | "low_stock" | "out_of_stock";

const productTabs: { value: ProductTab; label: string; description: string }[] = [
  {
    value: "all",
    label: "همه محصولات",
    description: "مدیریت محصول، وضعیت انتشار و اطلاعات اصلی.",
  },
  {
    value: "inventory",
    label: "موجودی",
    description: "موجودی تنوع‌ها و نیازهای انبار.",
  },
  {
    value: "low_stock",
    label: "کم‌موجودی‌ها",
    description: "محصولاتی که موجودی آن‌ها رو به اتمام است.",
  },
  {
    value: "out_of_stock",
    label: "ناموجودها",
    description: "محصولاتی که نیاز به شارژ یا اصلاح وضعیت دارند.",
  },
];

const normalizeTab = (tab: string | null): ProductTab =>
  productTabs.some((item) => item.value === tab) ? (tab as ProductTab) : "all";

const ProductsListPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = normalizeTab(searchParams.get("tab"));
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const queryFilters = useMemo<Filters>(
    () => ({
      ...filters,
      status: activeTab === "out_of_stock" ? "out_of_stock" : filters.status,
    }),
    [activeTab, filters],
  );

  const { data: products, isLoading, isError, refetch } = useProducts(queryFilters);
  const deleteProduct = useDeleteProduct();
  const setStatus = useSetProductStatus();

  const visibleProducts = useMemo(() => {
    if (!products) return [];
    if (activeTab === "low_stock") {
      return products.filter((product) => {
        const stock = getTotalStock(product);
        return stock > 0 && stock < 5;
      });
    }
    return products;
  }, [activeTab, products]);

  const hasActiveFilters = useMemo(
    () =>
      filters.search.trim() !== "" ||
      filters.status !== "all" ||
      filters.category !== "all",
    [filters],
  );

  const handleToggleStatus = (product: Product) => {
    setStatus.mutate({
      id: product.id,
      status: product.status === "inactive" ? "active" : "inactive",
    });
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteProduct.mutate(toDelete.id, { onSettled: () => setToDelete(null) });
  };

  const renderBody = () => {
    if (isLoading) {
      return <LoadingState fullHeight label="در حال بارگذاری محصولات..." />;
    }
    if (isError) {
      return (
        <EmptyState
          title="خطا در دریافت محصولات"
          description="مشکلی در بارگذاری محصولات پیش آمد. دوباره تلاش کنید."
          action={
            <Button variant="outline" onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          }
        />
      );
    }
    if (!products || products.length === 0 || visibleProducts.length === 0) {
      if (hasActiveFilters) {
        return (
          <EmptyState
            title="محصولی یافت نشد"
            description="با فیلترهای انتخاب‌شده محصولی پیدا نشد. فیلترها را تغییر دهید."
            action={
              <Button variant="outline" onClick={() => setFilters(initialFilters)}>
                حذف فیلترها
              </Button>
            }
          />
        );
      }

      return (
        <EmptyState
          title="هنوز محصولی در این بخش نیست"
          description="محصولات، موجودی و تنوع‌های فروشگاه از همین بخش مدیریت می‌شوند."
          action={
            <Button
              leadingIcon={<Icon name="plus" size={18} />}
              onClick={() => navigate(paths.productNew)}
            >
              افزودن محصول
            </Button>
          }
        />
      );
    }

    return (
      <ProductsList
        products={visibleProducts}
        onEdit={(id) => navigate(paths.productEdit(id))}
        onToggleStatus={handleToggleStatus}
        onDelete={setToDelete}
      />
    );
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="محصولات"
        description="محصولات، تنوع‌ها و موجودی فروشگاه خود را از همین بخش مدیریت کنید."
        actions={
          <Button
            leadingIcon={<Icon name="plus" size={18} />}
            onClick={() => navigate(paths.productNew)}
          >
            افزودن محصول
          </Button>
        }
      />

      <Tabs
        items={productTabs}
        value={activeTab}
        ariaLabel="بخش‌های محصولات"
        onChange={(tab) =>
          setSearchParams(tab === "all" ? {} : { tab })
        }
      />

      {activeTab === "inventory" && products && (
        <div className={styles.inventorySummary}>
          <Card padding="md" className={styles.inventoryCard}>
            <Icon name="products" size={20} />
            <div>
              <span>کل محصولات</span>
              <strong>{products.length.toLocaleString("fa-IR")}</strong>
            </div>
          </Card>
          <Card padding="md" className={styles.inventoryCard}>
            <Icon name="inventory" size={20} />
            <div>
              <span>کل موجودی تنوع‌ها</span>
              <strong>
                {products
                  .reduce((sum, product) => sum + getTotalStock(product), 0)
                  .toLocaleString("fa-IR")}
              </strong>
            </div>
          </Card>
          <Card padding="md" className={styles.inventoryCard}>
            <Icon name="alert-triangle" size={20} />
            <div>
              <span>نیازمند توجه</span>
              <strong>
                {products
                  .filter((product) => getTotalStock(product) < 5)
                  .length.toLocaleString("fa-IR")}
              </strong>
            </div>
          </Card>
        </div>
      )}

      <Card padding="sm" className={styles.filtersCard}>
        <ProductFilters filters={filters} onChange={setFilters} />
      </Card>

      {renderBody()}

      <Modal
        isOpen={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="حذف محصول"
        width={26}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setToDelete(null)}
              disabled={deleteProduct.isPending}
            >
              انصراف
            </Button>
            <Button
              variant="primary"
              onClick={confirmDelete}
              isLoading={deleteProduct.isPending}
            >
              حذف محصول
            </Button>
          </>
        }
      >
        <p className={styles.confirmText}>
          آیا از حذف «{toDelete?.title}» مطمئن هستید؟ این عمل قابل بازگشت نیست.
          برای غیرفعال‌سازی موقت می‌توانید به‌جای حذف، وضعیت محصول را تغییر دهید.
        </p>
      </Modal>
    </div>
  );
};

export default ProductsListPage;
