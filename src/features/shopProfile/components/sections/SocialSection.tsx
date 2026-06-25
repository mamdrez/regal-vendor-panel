import type { FC } from "react";
import { Icon } from "@/shared/ui";
import type { ShopProfile } from "../../types/shopProfile.types";
import { EMPTY_VALUE_LABEL } from "../../utils/shopProfileLabels";
import ProfileSectionCard from "../ProfileSectionCard";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const SocialSection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="شبکه‌های اجتماعی"
    description="لینک‌هایی که به خریدار کمک می‌کند تصویر کامل‌تری از برند شما ببیند."
    actionLabel="ویرایش لینک‌ها"
    onEdit={onEdit}
  >
    <div className={styles.linkGrid}>
      <div className={styles.linkCard}>
        <Icon name="instagram" size={22} />
        <span>اینستاگرام</span>
        <strong dir="ltr">{profile.instagram || EMPTY_VALUE_LABEL}</strong>
      </div>
      <div className={styles.linkCard}>
        <Icon name="globe" size={22} />
        <span>وب‌سایت</span>
        <strong dir="ltr">{profile.website || EMPTY_VALUE_LABEL}</strong>
      </div>
    </div>
  </ProfileSectionCard>
);

export default SocialSection;
