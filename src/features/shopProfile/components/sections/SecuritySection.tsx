import type { FC } from "react";
import type { ShopProfile } from "../../types/shopProfile.types";
import ProfileSectionCard from "../ProfileSectionCard";
import { StatusRow } from "./SectionPrimitives";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const SecuritySection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="امنیت"
    description="وضعیت امنیت حساب و پیشنهادهای محافظت از پنل فروشنده."
    actionLabel="مدیریت امنیت"
    onEdit={onEdit}
  >
    <div className={styles.statusList}>
      <StatusRow
        icon="settings"
        title="ورود دو مرحله‌ای"
        description="یک لایه امنیتی اضافه هنگام ورود به پنل فروشنده."
        enabled={profile.security.twoFactorEnabled}
      />
      <StatusRow
        icon="check"
        title="هشدار ورودهای جدید"
        description="اطلاع از ورود با دستگاه یا موقعیت ناشناس."
        enabled={profile.security.loginAlertsEnabled}
      />
    </div>
  </ProfileSectionCard>
);

export default SecuritySection;
