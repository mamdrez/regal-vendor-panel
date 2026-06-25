import type { FC } from "react";
import {
  AccountSettingsForm,
  BrandsCategoriesForm,
  BranchForm,
  ContactInfoForm,
  NotificationSettingsForm,
  SecuritySettingsForm,
  SocialLinksForm,
  StoreInfoForm,
} from "../forms";
import type { EditTarget } from "../hooks/useProfileEditPanel";
import type {
  BranchFormValues,
  ShopProfile,
} from "../types/shopProfile.types";

interface ProfileEditFormSwitchProps {
  editTarget: EditTarget;
  sectionDraft: ShopProfile | null;
  onSectionChange: (next: ShopProfile) => void;
  branchDraft: BranchFormValues;
  onBranchChange: (next: BranchFormValues) => void;
  branchError: string | null;
}

/** Maps the active edit target to its dedicated form. */
const ProfileEditFormSwitch: FC<ProfileEditFormSwitchProps> = ({
  editTarget,
  sectionDraft,
  onSectionChange,
  branchDraft,
  onBranchChange,
  branchError,
}) => {
  if (editTarget === "branch") {
    return (
      <BranchForm
        value={branchDraft}
        onChange={onBranchChange}
        error={branchError}
      />
    );
  }

  if (!sectionDraft || editTarget === null) return null;

  const formProps = { value: sectionDraft, onChange: onSectionChange };

  switch (editTarget) {
    case "store":
      return <StoreInfoForm {...formProps} />;
    case "contact":
      return <ContactInfoForm {...formProps} />;
    case "social":
      return <SocialLinksForm {...formProps} />;
    case "brands":
      return <BrandsCategoriesForm {...formProps} />;
    case "account":
      return <AccountSettingsForm {...formProps} />;
    case "security":
      return <SecuritySettingsForm {...formProps} />;
    case "notifications":
      return <NotificationSettingsForm {...formProps} />;
    default:
      return null;
  }
};

export default ProfileEditFormSwitch;
