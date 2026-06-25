import type { ShopProfile } from "../types/shopProfile.types";

/** Shared props for every section form that edits a draft profile in place. */
export interface ProfileSectionFormProps {
  value: ShopProfile;
  onChange: (next: ShopProfile) => void;
}
