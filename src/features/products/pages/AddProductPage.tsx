import { useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Icon, PageHeader } from "@/shared/ui";
import { paths } from "@/routers/paths";
import AddProductStepper, {
  type StepperItem,
} from "../components/AddProductStepper";
import BrandSelectionStep from "../components/BrandSelectionStep";
import CatalogProductSelectionStep from "../components/CatalogProductSelectionStep";
import SellingSetupStep from "../components/SellingSetupStep";
import ReviewProductStep from "../components/ReviewProductStep";
import { type SellingFieldErrors } from "../components/VendorProductSellingForm";
import { useAddVendorProduct } from "../hooks/useProductMutations";
import type {
  Brand,
  BrandCatalogItem,
  SellingSetupValues,
} from "../types/product.types";
import styles from "./AddProductPage.module.css";

const STEPS: StepperItem[] = [
  { label: "انتخاب برند" },
  { label: "انتخاب محصول" },
  { label: "تنظیمات فروش" },
  { label: "بررسی نهایی" },
];

const defaultSelling: SellingSetupValues = {
  price: 0,
  discountPrice: undefined,
  status: "active",
  variants: [],
  sellerNote: undefined,
};

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

const AddProductPage: FC = () => {
  const navigate = useNavigate();
  const addProduct = useAddVendorProduct();

  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [catalogItem, setCatalogItem] = useState<BrandCatalogItem | null>(null);
  const [selling, setSelling] = useState<SellingSetupValues>(defaultSelling);
  const [sellingErrors, setSellingErrors] = useState<SellingFieldErrors>({});

  const goToList = () => navigate(paths.products);
  const goToManual = () => navigate(paths.productNewManual);

  const handleSelectBrand = (next: Brand) => {
    setBrand(next);
    // Changing brand invalidates a previously chosen product.
    if (next.id !== brand?.id) setCatalogItem(null);
  };

  const handleSelectCatalogItem = (item: BrandCatalogItem) => {
    setCatalogItem(item);
  };

  const handleSelling = (values: SellingSetupValues) => {
    setSelling(values);
    if (Object.keys(sellingErrors).length > 0) setSellingErrors({});
  };

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(brand);
    if (step === 1) return Boolean(catalogItem);
    return true;
  }, [step, brand, catalogItem]);

  const handleContinue = () => {
    if (step === 2) {
      const errors = validateSelling(selling);
      if (Object.keys(errors).length > 0) {
        setSellingErrors(errors);
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    if (step === 0) {
      goToList();
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (!catalogItem) return;
    addProduct.mutate(
      { catalogItem, selling },
      { onSuccess: goToList },
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <BrandSelectionStep
            selectedBrandId={brand?.id ?? null}
            onSelect={handleSelectBrand}
          />
        );
      case 1:
        return brand ? (
          <CatalogProductSelectionStep
            brand={brand}
            selectedItemId={catalogItem?.id ?? null}
            onSelect={handleSelectCatalogItem}
            onManualCreate={goToManual}
          />
        ) : null;
      case 2:
        return catalogItem ? (
          <SellingSetupStep
            catalogItem={catalogItem}
            values={selling}
            onChange={handleSelling}
            errors={sellingErrors}
          />
        ) : null;
      case 3:
        return catalogItem ? (
          <ReviewProductStep catalogItem={catalogItem} selling={selling} />
        ) : null;
      default:
        return null;
    }
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className={styles.page}>
      <Button
        variant="ghost"
        leadingIcon={<Icon name="arrow-right" size={18} />}
        onClick={goToList}
        className={styles.back}
      >
        بازگشت به محصولات
      </Button>

      <PageHeader
        title="افزودن محصول"
        description="محصول موردنظر را از کاتالوگ برند انتخاب کنید و اطلاعات فروش را تکمیل کنید."
        actions={
          <Button variant="outline" onClick={goToManual}>
            محصولم در کاتالوگ نیست
          </Button>
        }
      />

      <Card padding="sm" className={styles.stepperCard}>
        <AddProductStepper
          steps={STEPS}
          current={step}
          onStepClick={setStep}
        />
      </Card>

      <Card padding="lg" className={styles.content}>
        {renderStep()}
      </Card>

      <div className={styles.actions}>
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={addProduct.isPending}
        >
          {step === 0 ? "انصراف" : "بازگشت"}
        </Button>
        {isLastStep ? (
          <Button
            onClick={handleSubmit}
            isLoading={addProduct.isPending}
            leadingIcon={<Icon name="check" size={18} />}
          >
            افزودن به فروشگاه
          </Button>
        ) : (
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            trailingIcon={<Icon name="arrow-left" size={18} />}
          >
            ادامه
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
