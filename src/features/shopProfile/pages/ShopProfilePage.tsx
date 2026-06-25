import { useEffect, useState, type FC } from "react";
import { Button, Card, EmptyState, LoadingState, PageHeader } from "@/shared/ui";
import BranchManager from "../components/BranchManager";
import ProfileForm from "../components/ProfileForm";
import { useSaveShopProfile, useShopProfile } from "../hooks/useShopProfile";
import type { ShopBranch, ShopProfile } from "../types/shopProfile.types";
import styles from "./ShopProfilePage.module.css";

const ShopProfilePage: FC = () => {
  const { data, isLoading, isError, refetch } = useShopProfile();
  const saveProfile = useSaveShopProfile();

  const [draft, setDraft] = useState<ShopProfile | null>(null);

  useEffect(() => {
    if (data) setDraft(data);
  }, [data]);

  if (isLoading || !draft) {
    if (isError) {
      return (
        <div className={styles.page}>
          <PageHeader title="پروفایل فروشگاه" />
          <EmptyState
            title="خطا در دریافت اطلاعات"
            description="اطلاعات فروشگاه بارگذاری نشد. دوباره تلاش کنید."
            action={
              <Button variant="outline" onClick={() => refetch()}>
                تلاش مجدد
              </Button>
            }
          />
        </div>
      );
    }
    return (
      <div className={styles.page}>
        <PageHeader title="پروفایل فروشگاه" />
        <LoadingState fullHeight label="در حال بارگذاری اطلاعات فروشگاه..." />
      </div>
    );
  }

  const updateBranches = (branches: ShopBranch[]) =>
    setDraft({ ...draft, branches });

  return (
    <div className={styles.page}>
      <PageHeader
        title="پروفایل فروشگاه"
        description="اطلاعات برند، راه‌های ارتباطی و شعب فروشگاه خود را مدیریت کنید."
      />

      <ProfileForm value={draft} onChange={setDraft} />

      <Card padding="lg">
        <BranchManager branches={draft.branches} onChange={updateBranches} />
      </Card>

      <div className={styles.saveBar}>
        <span className={styles.saveHint}>
          تغییرات به‌صورت محلی ذخیره می‌شوند.
        </span>
        <Button
          size="lg"
          isLoading={saveProfile.isPending}
          onClick={() => saveProfile.mutate(draft)}
        >
          ذخیره تغییرات
        </Button>
      </div>
    </div>
  );
};

export default ShopProfilePage;
