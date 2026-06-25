import { useMemo, useState, type FC, type ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Icon,
  LoadingState,
  PageHeader,
} from "@/shared/ui";
import { getBrandName, getCategoryLabel } from "@/shared/constants/catalog";
import BranchList from "../components/BranchList";
import {
  BranchForm,
  BrandsForm,
  ContactForm,
  SocialForm,
  StoreInfoForm,
} from "../components/ProfileEditForms";
import ProfileHero from "../components/ProfileHero";
import ProfileSectionNav, {
  type ProfileSectionId,
  type ProfileSectionItem,
} from "../components/ProfileSectionNav";
import ResponsiveEditPanel from "../components/ResponsiveEditPanel";
import { emptyBranchValues } from "../constants/shopProfileForm.constants";
import { useSaveShopProfile, useShopProfile } from "../hooks/useShopProfile";
import type {
  BranchFormValues,
  ShopBranch,
  ShopProfile,
} from "../types/shopProfile.types";
import styles from "./ShopProfilePage.module.css";

type EditableSectionId = "shop" | "contact" | "social" | "brands";
type EditTarget = EditableSectionId | "branch" | null;

const baseSectionItems: ProfileSectionItem[] = [
  {
    id: "shop",
    label: "اطلاعات فروشگاه",
    description: "نام، لوگو، تصویر کاور و توضیحات برند",
    icon: "store",
  },
  {
    id: "branches",
    label: "شعبات",
    description: "آدرس، شهر، ساعت کاری و وضعیت شعب",
    icon: "map-pin",
  },
  {
    id: "contact",
    label: "اطلاعات تماس",
    description: "شماره تماس، ایمیل و وب‌سایت فروشگاه",
    icon: "phone",
  },
  {
    id: "social",
    label: "شبکه‌های اجتماعی",
    description: "اینستاگرام و لینک‌های ارتباطی برند",
    icon: "instagram",
  },
  {
    id: "brands",
    label: "برندها و دسته‌بندی‌ها",
    description: "حوزه فعالیت و برندهای قابل فروش",
    icon: "tag",
  },
  {
    id: "account",
    label: "تنظیمات حساب",
    description: "وضعیت حساب، زبان پنل و اطلاعات پایه",
    icon: "user",
  },
  {
    id: "security",
    label: "امنیت",
    description: "رمز عبور، نشست‌ها و وضعیت امنیت حساب",
    icon: "settings",
  },
  {
    id: "notifications",
    label: "اعلان‌ها",
    description: "اعلان سفارش‌ها و هشدارهای موجودی",
    icon: "bell",
  },
];

const createBranchId = (): string =>
  `branch-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const getPanelTitle = (target: EditTarget, editingBranchId: string | null) => {
  if (target === "shop") return "ویرایش اطلاعات فروشگاه";
  if (target === "contact") return "ویرایش اطلاعات تماس";
  if (target === "social") return "ویرایش شبکه‌های اجتماعی";
  if (target === "brands") return "ویرایش برندها و دسته‌بندی‌ها";
  if (target === "branch")
    return editingBranchId ? "ویرایش شعبه" : "افزودن شعبه";
  return "";
};

const calculateCompletion = (profile: ShopProfile): number => {
  const checks = [
    profile.name,
    profile.logo,
    profile.coverImage,
    profile.description,
    profile.phone,
    profile.email,
    profile.website,
    profile.instagram,
    profile.categories.length > 0,
    profile.vendorType === "brand_owner" || profile.soldBrands.length > 0,
    profile.branches.length > 0,
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

const toBranchValues = (branch: ShopBranch): BranchFormValues => ({
  name: branch.name,
  city: branch.city,
  province: branch.province,
  address: branch.address,
  phone: branch.phone,
  workingHours: branch.workingHours,
  location: branch.location,
  isActive: branch.isActive,
});

interface SectionCardProps {
  title: string;
  description?: string;
  actionLabel: string;
  onEdit: () => void;
  children: ReactNode;
}

const SectionCard: FC<SectionCardProps> = ({
  title,
  description,
  actionLabel,
  onEdit,
  children,
}) => (
  <Card padding="lg" className={styles.sectionCard}>
    <div className={styles.sectionHeader}>
      <div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description && (
          <p className={styles.sectionDescription}>{description}</p>
        )}
      </div>
      <Button
        variant="outline"
        leadingIcon={<Icon name="edit" size={16} />}
        onClick={onEdit}
      >
        {actionLabel}
      </Button>
    </div>
    {children}
  </Card>
);

const DetailItem: FC<{
  label: string;
  value?: ReactNode;
  dir?: "ltr" | "rtl";
}> = ({ label, value, dir }) => (
  <div className={styles.detailItem}>
    <span>{label}</span>
    <strong dir={dir}>{value || "ثبت نشده"}</strong>
  </div>
);

const ChipList: FC<{ values: string[]; emptyText: string }> = ({
  values,
  emptyText,
}) =>
  values.length > 0 ? (
    <div className={styles.chipList}>
      {values.map((value) => (
        <span key={value} className={styles.chip}>
          {value}
        </span>
      ))}
    </div>
  ) : (
    <p className={styles.emptyInline}>{emptyText}</p>
  );

const ShopProfilePage: FC = () => {
  const { data, isLoading, isError, refetch } = useShopProfile();
  const saveProfile = useSaveShopProfile();
  const [profileOverride, setProfileOverride] = useState<ShopProfile | null>(
    null,
  );
  const [activeSection, setActiveSection] = useState<ProfileSectionId>("shop");
  const [editTarget, setEditTarget] = useState<EditTarget>(null);
  const [mobileViewSection, setMobileViewSection] =
    useState<ProfileSectionId | null>(null);
  const [sectionDraft, setSectionDraft] = useState<ShopProfile | null>(null);
  const [branchDraft, setBranchDraft] =
    useState<BranchFormValues>(emptyBranchValues);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchError, setBranchError] = useState<string | null>(null);

  const profile = profileOverride ?? data ?? null;
  const completion = useMemo(
    () => (profile ? calculateCompletion(profile) : 0),
    [profile],
  );

  const openSectionEdit = (target: EditableSectionId) => {
    if (!profile) return;
    setSectionDraft(profile);
    setEditTarget(target);
  };

  const handleMobileSelect = (id: ProfileSectionId) => {
    setActiveSection(id);
    setMobileViewSection(id);
  };

  const openBranchAdd = () => {
    setEditingBranchId(null);
    setBranchDraft(emptyBranchValues);
    setBranchError(null);
    setEditTarget("branch");
  };

  const openBranchEdit = (branch: ShopBranch) => {
    setEditingBranchId(branch.id);
    setBranchDraft(toBranchValues(branch));
    setBranchError(null);
    setEditTarget("branch");
  };

  const closePanel = () => {
    if (saveProfile.isPending) return;
    setEditTarget(null);
    setMobileViewSection(null);
    setSectionDraft(null);
    setEditingBranchId(null);
    setBranchError(null);
  };

  const persistProfile = (next: ShopProfile, onSuccess?: () => void) => {
    setProfileOverride(next);
    saveProfile.mutate(next, { onSuccess });
  };

  const saveSection = () => {
    if (!sectionDraft) return;
    persistProfile(sectionDraft, closePanel);
  };

  const saveBranch = () => {
    if (!profile) return;
    if (!branchDraft.name.trim() || !branchDraft.city.trim()) {
      setBranchError("نام شعبه و شهر الزامی است.");
      return;
    }

    const branches = editingBranchId
      ? profile.branches.map((branch) =>
          branch.id === editingBranchId
            ? { ...branch, ...branchDraft }
            : branch,
        )
      : [...profile.branches, { ...branchDraft, id: createBranchId() }];

    persistProfile({ ...profile, branches }, closePanel);
  };

  const toggleBranch = (branch: ShopBranch) => {
    if (!profile) return;
    persistProfile({
      ...profile,
      branches: profile.branches.map((item) =>
        item.id === branch.id ? { ...item, isActive: !item.isActive } : item,
      ),
    });
  };

  const removeBranch = (branch: ShopBranch) => {
    if (!profile) return;
    persistProfile({
      ...profile,
      branches: profile.branches.filter((item) => item.id !== branch.id),
    });
  };

  if (isLoading || !profile) {
    if (isError) {
      return (
        <div className={styles.page}>
          <PageHeader title="پروفایل" />
          <EmptyState
            title="خطا در دریافت اطلاعات"
            description="اطلاعات پروفایل بارگذاری نشد. دوباره تلاش کنید."
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
        <PageHeader title="پروفایل" />
        <LoadingState fullHeight label="در حال بارگذاری اطلاعات پروفایل..." />
      </div>
    );
  }

  const categoryLabels = profile.categories.map(getCategoryLabel);
  const soldBrandLabels = profile.soldBrands.map(getBrandName);
  const activeBranches = profile.branches.filter((branch) => branch.isActive);
  const sectionItems = baseSectionItems.map((item) => {
    if (item.id === "branches") {
      return {
        ...item,
        summary: `${activeBranches.length.toLocaleString("fa-IR")} شعبه فعال`,
      };
    }
    if (item.id === "brands") {
      return {
        ...item,
        summary: `${profile.categories.length.toLocaleString("fa-IR")} دسته‌بندی`,
      };
    }
    if (item.id === "contact") {
      return {
        ...item,
        summary: profile.phone || profile.email ? "تکمیل شده" : "نیازمند تکمیل",
      };
    }
    return item;
  });
  const mobileViewTitle =
    sectionItems.find((item) => item.id === mobileViewSection)?.label ?? "";

  const renderSectionContent = (sectionId: ProfileSectionId) => {
    if (sectionId === "shop") {
      return (
        <SectionCard
          title="اطلاعات فروشگاه"
          description="هویت اصلی، تصویر برند و معرفی کوتاه فروشگاه در این بخش نمایش داده می‌شود."
          actionLabel="ویرایش اطلاعات"
          onEdit={() => openSectionEdit("shop")}
        >
          <div className={styles.detailGrid}>
            <DetailItem label="نام" value={profile.name} />
            <DetailItem
              label="نوع فعالیت"
              value={
                profile.vendorType === "brand_owner" ? "صاحب برند" : "فروشنده"
              }
            />
            <DetailItem
              label="وضعیت"
              value={<Badge tone="success">فعال</Badge>}
            />
          </div>
          <p className={styles.previewText}>
            {profile.description || "معرفی کوتاهی برای فروشگاه ثبت نشده است."}
          </p>
        </SectionCard>
      );
    }

    if (sectionId === "branches") {
      return (
        <Card padding="lg" className={styles.sectionCard}>
          <BranchList
            branches={profile.branches}
            onAdd={openBranchAdd}
            onEdit={openBranchEdit}
            onToggle={toggleBranch}
            onRemove={removeBranch}
          />
        </Card>
      );
    }

    if (sectionId === "contact") {
      return (
        <SectionCard
          title="اطلاعات تماس"
          description="راه‌های اصلی ارتباط مشتریان و تیم رگال با فروشگاه شما."
          actionLabel="ویرایش تماس"
          onEdit={() => openSectionEdit("contact")}
        >
          <div className={styles.contactGrid}>
            <DetailItem label="شماره تماس" value={profile.phone} dir="ltr" />
            <DetailItem label="ایمیل" value={profile.email} dir="ltr" />
            <DetailItem label="وب‌سایت" value={profile.website} dir="ltr" />
          </div>
        </SectionCard>
      );
    }

    if (sectionId === "social") {
      return (
        <SectionCard
          title="شبکه‌های اجتماعی"
          description="لینک‌هایی که به خریدار کمک می‌کند تصویر کامل‌تری از برند شما ببیند."
          actionLabel="ویرایش لینک‌ها"
          onEdit={() => openSectionEdit("social")}
        >
          <div className={styles.linkGrid}>
            <div className={styles.linkCard}>
              <Icon name="instagram" size={22} />
              <span>اینستاگرام</span>
              <strong dir="ltr">{profile.instagram || "ثبت نشده"}</strong>
            </div>
            <div className={styles.linkCard}>
              <Icon name="globe" size={22} />
              <span>وب‌سایت</span>
              <strong dir="ltr">{profile.website || "ثبت نشده"}</strong>
            </div>
          </div>
        </SectionCard>
      );
    }

    if (sectionId === "brands") {
      return (
        <SectionCard
          title="برندها و دسته‌بندی‌ها"
          description="حوزه فعالیت فروشگاه و برندهایی که برای خریداران رگال نمایش داده می‌شوند."
          actionLabel="ویرایش دسته‌بندی"
          onEdit={() => openSectionEdit("brands")}
        >
          <div className={styles.stack}>
            <div>
              <h3 className={styles.subTitle}>دسته‌بندی‌های فعالیت</h3>
              <ChipList
                values={categoryLabels}
                emptyText="هنوز دسته‌بندی فعالیتی انتخاب نشده است."
              />
            </div>

            {profile.vendorType === "seller" ? (
              <div>
                <h3 className={styles.subTitle}>برندهای قابل فروش</h3>
                <ChipList
                  values={soldBrandLabels}
                  emptyText="هنوز برندی برای فروش ثبت نشده است."
                />
              </div>
            ) : (
              <div className={styles.brandOwnerNote}>
                <Icon name="tag" size={18} />
                <span>این پروفایل به‌عنوان صاحب برند مدیریت می‌شود.</span>
              </div>
            )}
          </div>
        </SectionCard>
      );
    }

    if (sectionId === "account") {
      return (
        <Card padding="lg" className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>تنظیمات حساب</h2>
              <p className={styles.sectionDescription}>
                تنظیمات اصلی حساب فروشنده و وضعیت دسترسی‌های پنل.
              </p>
            </div>
          </div>
          <div className={styles.settingsGrid}>
            <DetailItem label="نوع حساب" value="فروشنده رگال" />
            <DetailItem
              label="وضعیت احراز فروشگاه"
              value={<Badge tone="success">تایید شده</Badge>}
            />
            <DetailItem label="زبان پنل" value="فارسی" />
          </div>
        </Card>
      );
    }

    if (sectionId === "security") {
      return (
        <Card padding="lg" className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>امنیت</h2>
              <p className={styles.sectionDescription}>
                وضعیت امنیت حساب و پیشنهادهای محافظت از پنل فروشنده.
              </p>
            </div>
          </div>
          <div className={styles.preferenceList}>
            <div className={styles.preferenceItem}>
              <Icon name="settings" size={18} />
              <div>
                <strong>رمز عبور</strong>
                <span>
                  تغییر رمز عبور در نسخه بعدی به سرویس حساب کاربری متصل می‌شود.
                </span>
              </div>
              <Badge tone="neutral">آماده اتصال</Badge>
            </div>
            <div className={styles.preferenceItem}>
              <Icon name="check" size={18} />
              <div>
                <strong>نشست‌های فعال</strong>
                <span>
                  در نسخه mock، نشست فعلی به‌عنوان نشست امن نمایش داده می‌شود.
                </span>
              </div>
              <Badge tone="success">فعال</Badge>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card padding="lg" className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>اعلان‌ها</h2>
            <p className={styles.sectionDescription}>
              ترجیحات اطلاع‌رسانی فروشگاه، سفارش‌ها و موجودی محصولات.
            </p>
          </div>
        </div>
        <div className={styles.preferenceList}>
          <div className={styles.preferenceItem}>
            <Icon name="orders" size={18} />
            <div>
              <strong>اعلان سفارش جدید</strong>
              <span>
                برای سفارش‌های تازه و تغییر وضعیت سفارش‌ها نمایش داده می‌شود.
              </span>
            </div>
            <Badge tone="success">فعال</Badge>
          </div>
          <div className={styles.preferenceItem}>
            <Icon name="alert-triangle" size={18} />
            <div>
              <strong>هشدار موجودی کم</strong>
              <span>
                وقتی موجودی تنوع‌های محصول پایین باشد، در پنل برجسته می‌شود.
              </span>
            </div>
            <Badge tone="success">فعال</Badge>
          </div>
        </div>
      </Card>
    );
  };

  const renderPanelContent = () => {
    if (editTarget === "branch") {
      return (
        <BranchForm
          value={branchDraft}
          onChange={setBranchDraft}
          error={branchError}
        />
      );
    }

    if (mobileViewSection && editTarget === null) {
      return renderSectionContent(mobileViewSection);
    }

    if (!sectionDraft) return null;
    if (editTarget === "shop") {
      return <StoreInfoForm value={sectionDraft} onChange={setSectionDraft} />;
    }
    if (editTarget === "contact") {
      return <ContactForm value={sectionDraft} onChange={setSectionDraft} />;
    }
    if (editTarget === "social") {
      return <SocialForm value={sectionDraft} onChange={setSectionDraft} />;
    }
    if (editTarget === "brands") {
      return <BrandsForm value={sectionDraft} onChange={setSectionDraft} />;
    }
    return null;
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="پروفایل"
        description="پروفایل، اطلاعات فروشگاه و تنظیمات اصلی پنل فروشنده را از اینجا مدیریت کنید."
      />

      <ProfileHero
        profile={profile}
        completion={completion}
        onEdit={() => openSectionEdit("shop")}
      />

      <div className={styles.contentLayout}>
        <ProfileSectionNav
          items={sectionItems}
          activeId={activeSection}
          onChange={setActiveSection}
          onMobileSelect={handleMobileSelect}
        />
        <div className={styles.sectionContent}>
          {renderSectionContent(activeSection)}
        </div>
      </div>

      <ResponsiveEditPanel
        isOpen={editTarget !== null || mobileViewSection !== null}
        title={
          editTarget
            ? getPanelTitle(editTarget, editingBranchId)
            : mobileViewTitle
        }
        onClose={closePanel}
        onSave={editTarget === "branch" ? saveBranch : saveSection}
        isSaving={saveProfile.isPending}
        showFooter={editTarget !== null}
        saveLabel={
          editTarget === "branch" && !editingBranchId
            ? "افزودن شعبه"
            : "ذخیره تغییرات"
        }
      >
        {renderPanelContent()}
      </ResponsiveEditPanel>
    </div>
  );
};

export default ShopProfilePage;
