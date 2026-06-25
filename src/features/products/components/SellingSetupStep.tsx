import type { FC } from "react";
import type { BrandCatalogItem, SellingSetupValues } from "../types/product.types";
import SelectedCatalogProductPreview from "./SelectedCatalogProductPreview";
import VendorProductSellingForm, {
  type SellingFieldErrors,
} from "./VendorProductSellingForm";
import styles from "./SellingSetupStep.module.css";

interface SellingSetupStepProps {
  catalogItem: BrandCatalogItem;
  values: SellingSetupValues;
  onChange: (values: SellingSetupValues) => void;
  errors?: SellingFieldErrors;
}

const SellingSetupStep: FC<SellingSetupStepProps> = ({
  catalogItem,
  values,
  onChange,
  errors,
}) => (
  <div className={styles.step}>
    <div className={styles.intro}>
      <h2 className={styles.title}>تنظیمات فروش</h2>
      <p className={styles.description}>
        اطلاعات محصول از کاتالوگ تکمیل شده است. کافی است اطلاعات فروش خود را
        وارد کنید.
      </p>
    </div>

    <SelectedCatalogProductPreview item={catalogItem} />

    <VendorProductSellingForm
      values={values}
      onChange={onChange}
      errors={errors}
      availableColors={catalogItem.availableColors}
      availableSizes={catalogItem.availableSizes}
    />
  </div>
);

export default SellingSetupStep;
