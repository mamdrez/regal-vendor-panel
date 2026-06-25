import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Icon, LoadingState, PageHeader, EmptyState } from "@/shared/ui";
import { paths } from "@/routers/paths";
import ProductForm from "../components/ProductForm";
import { useProduct } from "../hooks/useProducts";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../hooks/useProductMutations";
import type { Product, ProductFormValues } from "../types/product.types";
import styles from "./ProductFormPage.module.css";

const emptyValues: ProductFormValues = {
  title: "",
  brandName: "",
  categoryName: "",
  description: "",
  images: [],
  price: 0,
  discountPrice: undefined,
  status: "draft",
  variants: [],
};

const toFormValues = (product: Product): ProductFormValues => ({
  title: product.title,
  brandName: product.brandName,
  categoryName: product.categoryName,
  description: product.description,
  images: product.images,
  price: product.price,
  discountPrice: product.discountPrice,
  status: product.status,
  variants: product.variants,
});

const ProductFormPage: FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const isEdit = Boolean(productId);

  const productQuery = useProduct(productId);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(productId ?? "");

  const goToList = () => navigate(paths.products);

  const handleSubmit = (values: ProductFormValues) => {
    if (isEdit) {
      updateProduct.mutate(values, { onSuccess: goToList });
    } else {
      createProduct.mutate(values, { onSuccess: goToList });
    }
  };

  const backButton = (
    <Button
      variant="ghost"
      leadingIcon={<Icon name="arrow-right" size={18} />}
      onClick={goToList}
    >
      بازگشت به محصولات
    </Button>
  );

  if (isEdit && productQuery.isLoading) {
    return (
      <div className={styles.page}>
        {backButton}
        <LoadingState fullHeight label="در حال بارگذاری محصول..." />
      </div>
    );
  }

  if (isEdit && productQuery.isError) {
    return (
      <div className={styles.page}>
        {backButton}
        <EmptyState
          title="محصول یافت نشد"
          description="محصول مورد نظر وجود ندارد یا حذف شده است."
          action={
            <Button variant="outline" onClick={goToList}>
              بازگشت به فهرست
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {backButton}
      <PageHeader
        title={isEdit ? "ویرایش محصول" : "افزودن محصول"}
        description={
          isEdit
            ? "اطلاعات محصول را ویرایش و ذخیره کنید."
            : "اطلاعات محصول جدید را وارد کنید."
        }
      />
      <ProductForm
        initialValues={
          isEdit && productQuery.data
            ? toFormValues(productQuery.data)
            : emptyValues
        }
        submitLabel={isEdit ? "ذخیره تغییرات" : "ایجاد محصول"}
        isSubmitting={createProduct.isPending || updateProduct.isPending}
        onSubmit={handleSubmit}
        onCancel={goToList}
      />
    </div>
  );
};

export default ProductFormPage;
