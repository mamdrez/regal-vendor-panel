import type { FC } from "react";
import type { ShopProfile } from "../../types/shopProfile.types";
import ProfileSectionCard from "../ProfileSectionCard";
import { DetailItem } from "./SectionPrimitives";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const ContactSection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="اطلاعات تماس"
    description="راه‌های اصلی ارتباط مشتریان و تیم رگال با فروشگاه شما."
    actionLabel="ویرایش تماس"
    onEdit={onEdit}
  >
    <div className={`${styles.detailGrid} ${styles.detailGridTwo}`}>
      <DetailItem label="شماره تماس" value={profile.phone} dir="ltr" />
      <DetailItem label="ایمیل" value={profile.email} dir="ltr" />
      <DetailItem label="وب‌سایت" value={profile.website} dir="ltr" />
    </div>
  </ProfileSectionCard>
);

export default ContactSection;
