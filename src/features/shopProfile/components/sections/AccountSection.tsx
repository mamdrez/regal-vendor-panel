import type { FC } from "react";
import { Badge } from "@/shared/ui";
import type { ShopProfile } from "../../types/shopProfile.types";
import {
  getLanguageLabel,
  getStoreStatusLabel,
} from "../../utils/shopProfileLabels";
import ProfileSectionCard from "../ProfileSectionCard";
import { DetailItem } from "./SectionPrimitives";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const AccountSection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="تنظیمات حساب"
    description="تنظیمات اصلی حساب فروشنده و وضعیت دسترسی‌های پنل."
    actionLabel="ویرایش تنظیمات"
    onEdit={onEdit}
  >
    <div className={styles.detailGrid}>
      <DetailItem
        label="زبان پنل"
        value={getLanguageLabel(profile.account.language)}
      />
      <DetailItem
        label="وضعیت فروشگاه"
        value={
          <Badge
            tone={profile.account.storeStatus === "active" ? "success" : "warning"}
          >
            {getStoreStatusLabel(profile.account.storeStatus)}
          </Badge>
        }
      />
      <DetailItem label="احراز فروشگاه" value={<Badge tone="success">تایید شده</Badge>} />
    </div>
  </ProfileSectionCard>
);

export default AccountSection;
