import { useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  EmptyState,
  Icon,
  LoadingState,
  Modal,
  PageHeader,
} from "@/shared/ui";
import { paths } from "@/routers/paths";
import ProductFilters from "../components/ProductFilters";
import ProductsList from "../components/ProductsList";
import { useProducts } from "../hooks/useProducts";
import {
  useDeleteProduct,
  useSetProductStatus,
} from "../hooks/useProductMutations";
import type { Product, ProductFilters as Filters } from "../types/product.types";
import styles from "./ProductsListPage.module.css";

const initialFilters: Filters = { search: "", status: "all", category: "all" };

const ProductsListPage: FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const { data: products, isLoading, isError, refetch } = useProducts(filters);
  const deleteProduct = useDeleteProduct();
  const setStatus = useSetProductStatus();

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
    if (!products || products.length === 0) {
      return hasActiveFilters ? (
        <EmptyState
          title="محصولی یافت نشد"
          description="با فیلترهای انتخاب‌شده محصولی پیدا نشد. فیلترها را تغییر دهید."
          action={
            <Button variant="outline" onClick={() => setFilters(initialFilters)}>
              حذف فیلترها
            </Button>
          }
        />
      ) : (
        <EmptyState
          title="هنوز محصولی اضافه نکرده‌اید"
          description="اولین محصول فروشگاه خود را اضافه کنید تا اینجا نمایش داده شود."
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
        products={products}
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
        description="محصولات فروشگاه خود را مدیریت کنید."
        actions={
          <Button
            leadingIcon={<Icon name="plus" size={18} />}
            onClick={() => navigate(paths.productNew)}
          >
            افزودن محصول
          </Button>
        }
      />

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
