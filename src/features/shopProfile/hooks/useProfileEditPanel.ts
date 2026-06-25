import { useState } from "react";
import type {
  BranchFormValues,
  ProfileSectionId,
  ShopBranch,
  ShopProfile,
} from "../types/shopProfile.types";
import { emptyBranchValues, toBranchValues } from "../utils/shopProfileMappers";

/** Section ids that open a profile-editing form (everything except branches). */
export type SectionEditTarget = Exclude<ProfileSectionId, "branches">;

/** What the responsive edit panel is currently showing. */
export type EditTarget = SectionEditTarget | "branch" | null;

/**
 * Owns all of the edit-panel UI state: which section/branch is being edited,
 * the working drafts, and the mobile section-preview state. Keeps the page
 * component free of imperative open/close plumbing.
 */
export const useProfileEditPanel = () => {
  const [editTarget, setEditTarget] = useState<EditTarget>(null);
  const [sectionDraft, setSectionDraft] = useState<ShopProfile | null>(null);
  const [branchDraft, setBranchDraft] =
    useState<BranchFormValues>(emptyBranchValues);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchError, setBranchError] = useState<string | null>(null);
  const [mobileViewSection, setMobileViewSection] =
    useState<ProfileSectionId | null>(null);

  const openSectionEdit = (target: SectionEditTarget, profile: ShopProfile) => {
    setSectionDraft(profile);
    setEditTarget(target);
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

  const openMobileView = (section: ProfileSectionId) => {
    setMobileViewSection(section);
  };

  const close = () => {
    setEditTarget(null);
    setMobileViewSection(null);
    setSectionDraft(null);
    setEditingBranchId(null);
    setBranchError(null);
  };

  return {
    editTarget,
    sectionDraft,
    setSectionDraft,
    branchDraft,
    setBranchDraft,
    editingBranchId,
    branchError,
    setBranchError,
    mobileViewSection,
    isOpen: editTarget !== null || mobileViewSection !== null,
    openSectionEdit,
    openBranchAdd,
    openBranchEdit,
    openMobileView,
    close,
  };
};
