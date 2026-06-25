import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, PageHeader } from "@/shared/ui";
import { paths } from "@/routers/paths";
import ProductForm from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useProductMutations";
import type { ProductFormValues } from "../types/product.types";
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

/**
 * Secondary, manual product creation — used when a product is not available
 * in the Regal brand catalog. The primary add flow is the guided catalog
 * experience in {@link AddProductPage}.
 */
const ProductFormPage: FC = () => {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const goToList = () => navigate(paths.products);
  const goToGuided = () => navigate(paths.productNew);

  const handleSubmit = (values: ProductFormValues) => {
    createProduct.mutate(values, { onSuccess: goToList });
  };

  return (
    <div className={styles.page}>
      <Button
        variant="ghost"
        leadingIcon={<Icon name="arrow-right" size={18} />}
        onClick={goToGuided}
      >
        بازگشت به انتخاب از کاتالوگ
      </Button>
      <PageHeader
        title="افزودن محصول دستی"
        description="اگر محصول شما در کاتالوگ برندها نیست، اطلاعات آن را به‌صورت دستی وارد کنید."
      />
      <ProductForm
        initialValues={emptyValues}
        submitLabel="ایجاد محصول"
        isSubmitting={createProduct.isPending}
        onSubmit={handleSubmit}
        onCancel={goToList}
      />
    </div>
  );
};

export default ProductFormPage;
