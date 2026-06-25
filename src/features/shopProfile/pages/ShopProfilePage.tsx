import { useMemo, useState, type FC } from "react";
import { Button, EmptyState, LoadingState, PageHeader } from "@/shared/ui";
import { PROFILE_SECTIONS } from "../constants/profileSections";
import ProfileEditFormSwitch from "../components/ProfileEditFormSwitch";
import ProfileHero from "../components/ProfileHero";
import ProfileOverview from "../components/ProfileOverview";
import ProfileSectionMenu, {
  type ProfileSectionMenuItem,
} from "../components/ProfileSectionMenu";
import ResponsiveEditPanel from "../components/ResponsiveEditPanel";
import { useProfileEditPanel } from "../hooks/useProfileEditPanel";
import { useShopProfile } from "../hooks/useShopProfile";
import { useShopProfileMutations } from "../hooks/useShopProfileMutations";
import type {
  ProfileSectionId,
  ShopBranch,
} from "../types/shopProfile.types";
import { getEditPanelTitle } from "../utils/shopProfileLabels";
import {
  calculateCompletion,
  getSectionSummary,
} from "../utils/shopProfileMappers";
import styles from "./ShopProfilePage.module.css";

const ShopProfilePage: FC = () => {
  const { data: profile, isLoading, isError, refetch } = useShopProfile();
  const { saveProfile, createBranch, updateBranch, deleteBranch } =
    useShopProfileMutations();
  const panel = useProfileEditPanel();

  const [activeSection, setActiveSection] = useState<ProfileSectionId>("store");

  const completion = useMemo(
    () => (profile ? calculateCompletion(profile) : 0),
    [profile],
  );

  const menuItems = useMemo<ProfileSectionMenuItem[]>(
    () =>
      profile
        ? PROFILE_SECTIONS.map((section) => ({
            ...section,
            summary: getSectionSummary(profile, section.id),
          }))
        : [],
    [profile],
  );

  const isBranchSaving = createBranch.isPending || updateBranch.isPending;
  const isPanelSaving =
    panel.editTarget === "branch" ? isBranchSaving : saveProfile.isPending;

  const closePanel = () => {
    if (isPanelSaving) return;
    panel.close();
  };

  const handleMobileSelect = (id: ProfileSectionId) => {
    setActiveSection(id);
    panel.openMobileView(id);
  };

  const saveSection = () => {
    if (!panel.sectionDraft) return;
    saveProfile.mutate(panel.sectionDraft, { onSuccess: panel.close });
  };

  const saveBranch = () => {
    const draft = panel.branchDraft;
    if (!draft.name.trim() || !draft.city.trim()) {
      panel.setBranchError("نام شعبه و شهر الزامی است.");
      return;
    }

    if (panel.editingBranchId) {
      updateBranch.mutate(
        { ...draft, id: panel.editingBranchId },
        { onSuccess: panel.close },
      );
    } else {
      createBranch.mutate(draft, { onSuccess: panel.close });
    }
  };

  const toggleBranch = (branch: ShopBranch) =>
    updateBranch.mutate({ ...branch, isActive: !branch.isActive });

  const removeBranch = (branch: ShopBranch) => deleteBranch.mutate(branch.id);

  if (isLoading || !profile) {
    return (
      <div className={styles.page}>
        <PageHeader title="پروفایل" />
        {isError ? (
          <EmptyState
            title="خطا در دریافت اطلاعات"
            description="اطلاعات پروفایل بارگذاری نشد. دوباره تلاش کنید."
            action={
              <Button variant="outline" onClick={() => refetch()}>
                تلاش مجدد
              </Button>
            }
          />
        ) : (
          <LoadingState fullHeight label="در حال بارگذاری اطلاعات پروفایل..." />
        )}
      </div>
    );
  }

  const mobileViewTitle =
    menuItems.find((item) => item.id === panel.mobileViewSection)?.label ?? "";
  const isFormOpen = panel.editTarget !== null;

  return (
    <div className={styles.page}>
      <PageHeader
        title="پروفایل"
        description="پروفایل، اطلاعات فروشگاه و تنظیمات اصلی پنل فروشنده را از اینجا مدیریت کنید."
      />

      <ProfileHero
        profile={profile}
        completion={completion}
        onEdit={() => panel.openSectionEdit("store", profile)}
      />

      <div className={styles.contentLayout}>
        <ProfileSectionMenu
          items={menuItems}
          activeId={activeSection}
          onChange={setActiveSection}
          onMobileSelect={handleMobileSelect}
        />
        <div className={styles.sectionContent}>
          <ProfileOverview
            profile={profile}
            section={activeSection}
            onEditSection={(target) => panel.openSectionEdit(target, profile)}
            onAddBranch={panel.openBranchAdd}
            onEditBranch={panel.openBranchEdit}
            onToggleBranch={toggleBranch}
            onRemoveBranch={removeBranch}
          />
        </div>
      </div>

      <ResponsiveEditPanel
        isOpen={panel.isOpen}
        title={
          isFormOpen
            ? getEditPanelTitle(panel.editTarget, panel.editingBranchId !== null)
            : mobileViewTitle
        }
        onClose={closePanel}
        onSave={panel.editTarget === "branch" ? saveBranch : saveSection}
        isSaving={isPanelSaving}
        showFooter={isFormOpen}
        saveLabel={
          panel.editTarget === "branch" && !panel.editingBranchId
            ? "افزودن شعبه"
            : "ذخیره تغییرات"
        }
      >
        {isFormOpen ? (
          <ProfileEditFormSwitch
            editTarget={panel.editTarget}
            sectionDraft={panel.sectionDraft}
            onSectionChange={panel.setSectionDraft}
            branchDraft={panel.branchDraft}
            onBranchChange={panel.setBranchDraft}
            branchError={panel.branchError}
          />
        ) : (
          panel.mobileViewSection && (
            <ProfileOverview
              profile={profile}
              section={panel.mobileViewSection}
              onEditSection={(target) => panel.openSectionEdit(target, profile)}
              onAddBranch={panel.openBranchAdd}
              onEditBranch={panel.openBranchEdit}
              onToggleBranch={toggleBranch}
              onRemoveBranch={removeBranch}
            />
          )
        )}
      </ResponsiveEditPanel>
    </div>
  );
};

export default ShopProfilePage;
