import { useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button, Icon, Input, LoadingState, Logo } from "@/shared/ui";
import { paths } from "@/routers/paths";
import { useAuth } from "@/features/auth/hooks/useAuth";
import SelectableChip from "../components/SelectableChip";
import VendorTypeOption from "../components/VendorTypeOption";
import { useBrands, useCategories } from "../hooks/useOnboardingData";
import { vendorOnboardingMockApi } from "../services/vendorOnboardingMockApi";
import type {
  VendorOnboardingFormValues,
  VendorType,
} from "../types/onboarding.types";
import styles from "./OnboardingPage.module.css";

const initialValues: VendorOnboardingFormValues = {
  vendorType: null,
  categoryIds: [],
  soldBrandIds: [],
  brandName: "",
};

const totalSteps = 3;

const OnboardingPage: FC = () => {
  const navigate = useNavigate();
  const { user, markOnboardingCompleted } = useAuth();

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<VendorOnboardingFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);

  const categoriesQuery = useCategories();
  const brandsQuery = useBrands();

  const saveMutation = useMutation({
    mutationFn: () => vendorOnboardingMockApi.saveProfile(values),
    onSuccess: () => {
      markOnboardingCompleted();
      navigate(paths.dashboard, { replace: true });
    },
    onError: (err: unknown) => {
      setError(
        err instanceof Error ? err.message : "ذخیره اطلاعات ناموفق بود.",
      );
    },
  });

  const isSeller = values.vendorType === "seller";

  const selectVendorType = (type: VendorType) => {
    setValues((prev) => ({ ...prev, vendorType: type }));
    setError(null);
  };

  const toggleCategory = (id: string) => {
    setValues((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const toggleBrand = (id: string) => {
    setValues((prev) => ({
      ...prev,
      soldBrandIds: prev.soldBrandIds.includes(id)
        ? prev.soldBrandIds.filter((b) => b !== id)
        : [...prev.soldBrandIds, id],
    }));
  };

  const canContinue = useMemo(() => {
    if (step === 0) return values.vendorType !== null;
    if (step === 1) return values.categoryIds.length > 0;
    if (step === 2) {
      return isSeller
        ? values.soldBrandIds.length > 0
        : values.brandName.trim().length >= 2;
    }
    return false;
  }, [step, values, isSeller]);

  const goNext = () => {
    setError(null);
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      saveMutation.mutate();
    }
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <Logo size={40} withWordmark />
          <span className={styles.stepBadge}>
            مرحله {step + 1} از {totalSteps}
          </span>
        </header>

        <div className={styles.progress}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span
              key={index}
              className={`${styles.progressBar} ${
                index <= step ? styles.progressActive : ""
              }`}
            />
          ))}
        </div>

        <div className={styles.greeting}>
          {user?.fullName && (
            <p className={styles.welcome}>{user.fullName} عزیز، خوش آمدید 👋</p>
          )}
        </div>

        <div className={styles.body}>
          {step === 0 && (
            <section className={styles.stepSection}>
              <h2 className={styles.stepTitle}>کدام گزینه شما را توصیف می‌کند؟</h2>
              <p className={styles.stepHint}>
                این انتخاب به ما کمک می‌کند تجربه پنل را برای شما شخصی‌سازی کنیم.
              </p>
              <div className={styles.optionsColumn}>
                <VendorTypeOption
                  title="صاحب برند"
                  description="صاحب برند هستم و محصولات برند خودم را می‌فروشم"
                  icon={<Icon name="tag" size={24} />}
                  selected={values.vendorType === "brand_owner"}
                  onSelect={() => selectVendorType("brand_owner")}
                />
                <VendorTypeOption
                  title="فروشنده"
                  description="فروشنده هستم و محصولات برندهای دیگر را می‌فروشم"
                  icon={<Icon name="store" size={24} />}
                  selected={values.vendorType === "seller"}
                  onSelect={() => selectVendorType("seller")}
                />
              </div>
            </section>
          )}

          {step === 1 && (
            <section className={styles.stepSection}>
              <h2 className={styles.stepTitle}>چه دسته‌بندی‌هایی می‌فروشید؟</h2>
              <p className={styles.stepHint}>
                می‌توانید چند مورد را انتخاب کنید.
              </p>
              {categoriesQuery.isLoading ? (
                <LoadingState label="در حال بارگذاری دسته‌بندی‌ها..." />
              ) : (
                <div className={styles.chips}>
                  {categoriesQuery.data?.map((category) => (
                    <SelectableChip
                      key={category.id}
                      label={category.label}
                      selected={values.categoryIds.includes(category.id)}
                      onToggle={() => toggleCategory(category.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {step === 2 && (
            <section className={styles.stepSection}>
              {isSeller ? (
                <>
                  <h2 className={styles.stepTitle}>محصولات کدام برندها را می‌فروشید؟</h2>
                  <p className={styles.stepHint}>
                    برندهای مورد نظر خود را انتخاب کنید.
                  </p>
                  {brandsQuery.isLoading ? (
                    <LoadingState label="در حال بارگذاری برندها..." />
                  ) : (
                    <div className={styles.chips}>
                      {brandsQuery.data?.map((brand) => (
                        <SelectableChip
                          key={brand.id}
                          label={brand.name}
                          selected={values.soldBrandIds.includes(brand.id)}
                          onToggle={() => toggleBrand(brand.id)}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className={styles.stepTitle}>نام برند شما چیست؟</h2>
                  <p className={styles.stepHint}>
                    نام برندی که محصولات آن را می‌فروشید وارد کنید.
                  </p>
                  <div className={styles.brandInput}>
                    <Input
                      name="brandName"
                      placeholder="مثلاً: رگال"
                      value={values.brandName}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          brandName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}
            </section>
          )}

          {error && <div className={styles.alert}>{error}</div>}
        </div>

        <footer className={styles.footer}>
          {step > 0 ? (
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={saveMutation.isPending}
              leadingIcon={<Icon name="chevron-left" size={18} />}
            >
              مرحله قبل
            </Button>
          ) : (
            <span />
          )}
          <Button
            onClick={goNext}
            disabled={!canContinue}
            isLoading={saveMutation.isPending}
          >
            {step === totalSteps - 1 ? "ورود به پنل" : "ادامه"}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default OnboardingPage;
