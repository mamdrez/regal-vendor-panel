import type { FC } from "react";
import type { SectionEditTarget } from "../hooks/useProfileEditPanel";
import type {
  ProfileSectionId,
  ShopBranch,
  ShopProfile,
} from "../types/shopProfile.types";
import {
  AccountSection,
  BranchesSection,
  BrandsSection,
  ContactSection,
  NotificationsSection,
  SecuritySection,
  SocialSection,
  StoreInfoSection,
} from "./sections";

interface ProfileOverviewProps {
  profile: ShopProfile;
  section: ProfileSectionId;
  onEditSection: (target: SectionEditTarget) => void;
  onAddBranch: () => void;
  onEditBranch: (branch: ShopBranch) => void;
  onToggleBranch: (branch: ShopBranch) => void;
  onRemoveBranch: (branch: ShopBranch) => void;
}

/**
 * Renders the preview content for the currently selected profile section.
 * Keeps the page free of a large section switch.
 */
const ProfileOverview: FC<ProfileOverviewProps> = ({
  profile,
  section,
  onEditSection,
  onAddBranch,
  onEditBranch,
  onToggleBranch,
  onRemoveBranch,
}) => {
  switch (section) {
    case "store":
      return (
        <StoreInfoSection profile={profile} onEdit={() => onEditSection("store")} />
      );
    case "branches":
      return (
        <BranchesSection
          branches={profile.branches}
          onAdd={onAddBranch}
          onEdit={onEditBranch}
          onToggle={onToggleBranch}
          onRemove={onRemoveBranch}
        />
      );
    case "contact":
      return (
        <ContactSection profile={profile} onEdit={() => onEditSection("contact")} />
      );
    case "social":
      return (
        <SocialSection profile={profile} onEdit={() => onEditSection("social")} />
      );
    case "brands":
      return (
        <BrandsSection profile={profile} onEdit={() => onEditSection("brands")} />
      );
    case "account":
      return (
        <AccountSection profile={profile} onEdit={() => onEditSection("account")} />
      );
    case "security":
      return (
        <SecuritySection profile={profile} onEdit={() => onEditSection("security")} />
      );
    case "notifications":
      return (
        <NotificationsSection
          profile={profile}
          onEdit={() => onEditSection("notifications")}
        />
      );
    default:
      return null;
  }
};

export default ProfileOverview;
