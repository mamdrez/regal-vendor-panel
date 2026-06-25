import { useMemo, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  EmptyState,
  Icon,
  LoadingState,
  PageHeader,
} from "@/shared/ui";
import { paths } from "@/routers/paths";
import SelectedCatalogProductPreview from "../components/SelectedCatalogProductPreview";
import VendorProductSellingForm, {
  type SellingFieldErrors,
} from "../components/VendorProductSellingForm";
import { useProduct } from "../hooks/useProducts";
import { useUpdateProduct } from "../hooks/useProductMutations";
import type {
  BrandCatalogItem,
  Product,
  ProductFormValues,
  SellingSetupValues,
} from "../types/product.types";
import styles from "./ProductEditPage.module.css";

const unique = (values: string[]): string[] =>
  Array.from(new Set(values.filter(Boolean)));

/** Builds a read-only catalog identity view from a saved vendor product. */
const toCatalogPreview = (product: Product): BrandCatalogItem => ({
  id: product.catalogItemId ?? product.id,
  brandId: product.brandId ?? "",
  brandName: product.brandName,
  title: product.title,
  categoryName: product.categoryName,
  images: product.images,
  description: product.description,
  availableColors: unique(product.variants.map((variant) => variant.color)),
  availableSizes: unique(product.variants.map((variant) => variant.size)),
  source: product.source ?? "catalog",
});

const toSellingValues = (product: Product): SellingSetupValues => ({
  price: product.price,
  discountPrice: product.discountPrice,
  status: product.status,
  variants: product.variants,
  sellerNote: product.sellerNote,
});

const validateSelling = (values: SellingSetupValues): SellingFieldErrors => {
  const errors: SellingFieldErrors = {};
  if (!values.price || values.price <= 0)
    errors.price = "قیمت فروش معتبر وارد کنید.";
  if (values.discountPrice && values.discountPrice >= values.price)
    errors.discountPrice = "قیمت با تخفیف باید کمتر از قیمت فروش باشد.";
  if (values.variants.length === 0)
    errors.variants = "حداقل یک تنوع رنگ یا سایز اضافه کنید.";
  return errors;
};

const ProductEditPage: FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const productQuery = useProduct(productId);
  const updateProduct = useUpdateProduct(productId ?? "");

  const goToList = () => navigate(paths.products);

  const backButton = (
    <Button
      variant="ghost"
      leadingIcon={<Icon name="arrow-right" size={18} />}
      onClick={goToList}
      className={styles.back}
    >
      بازگشت به محصولات
    </Button>
  );

  if (productQuery.isLoading) {
    return (
      <div className={styles.page}>
        {backButton}
        <LoadingState fullHeight label="در حال بارگذاری محصول..." />
      </div>
    );
  }

  if (productQuery.isError || !productQuery.data) {
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
    <ProductEditForm
      product={productQuery.data}
      isSubmitting={updateProduct.isPending}
      onSubmit={(values) =>
        updateProduct.mutate(values, { onSuccess: goToList })
      }
      onCancel={goToList}
      backButton={backButton}
    />
  );
};

interface ProductEditFormProps {
  product: Product;
  isSubmitting: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  backButton: React.ReactNode;
}

const ProductEditForm: FC<ProductEditFormProps> = ({
  product,
  isSubmitting,
  onSubmit,
  onCancel,
  backButton,
}) => {
  const preview = useMemo(() => toCatalogPreview(product), [product]);
  const [selling, setSelling] = useState<SellingSetupValues>(() =>
    toSellingValues(product),
  );
  const [errors, setErrors] = useState<SellingFieldErrors>({});

  const handleChange = (values: SellingSetupValues) => {
    setSelling(values);
    if (Object.keys(errors).length > 0) setErrors({});
  };

  const handleSubmit = () => {
    const validation = validateSelling(selling);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onSubmit({
      title: product.title,
      brandName: product.brandName,
      categoryName: product.categoryName,
      description: product.description,
      images: product.images,
      price: selling.price,
      discountPrice: selling.discountPrice,
      status: selling.status,
      variants: selling.variants,
      sellerNote: selling.sellerNote,
      catalogItemId: product.catalogItemId,
      brandId: product.brandId,
      source: product.source,
    });
  };

  return (
    <div className={styles.page}>
      {backButton}
      <PageHeader
        title="ویرایش محصول"
        description="اطلاعات فروش این محصول را ویرایش کنید. مشخصات کاتالوگ ثابت است."
      />

      <Card padding="lg" className={styles.content}>
        <div className={styles.intro}>
          <h2 className={styles.sectionTitle}>مشخصات محصول (کاتالوگ)</h2>
          <p className={styles.note}>این اطلاعات از کاتالوگ برند است و قابل ویرایش نیست.</p>
        </div>
        <SelectedCatalogProductPreview item={preview} />
        <div className={styles.divider} />
        <VendorProductSellingForm
          values={selling}
          onChange={handleChange}
          errors={errors}
          availableColors={preview.availableColors}
          availableSizes={preview.availableSizes}
        />
      </Card>

      <div className={styles.actions}>
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          انصراف
        </Button>
        <Button onClick={handleSubmit} isLoading={isSubmitting}>
          ذخیره تغییرات
        </Button>
      </div>
    </div>
  );
};

export default ProductEditPage;
