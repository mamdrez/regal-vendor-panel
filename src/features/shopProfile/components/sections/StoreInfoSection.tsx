import type { FC } from "react";
import { Badge } from "@/shared/ui";
import type { ShopProfile } from "../../types/shopProfile.types";
import { getVendorTypeLabel } from "../../utils/shopProfileLabels";
import ProfileSectionCard from "../ProfileSectionCard";
import { DetailItem } from "./SectionPrimitives";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const StoreInfoSection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="اطلاعات فروشگاه"
    description="هویت اصلی، تصویر برند و معرفی کوتاه فروشگاه در این بخش نمایش داده می‌شود."
    actionLabel="ویرایش اطلاعات"
    onEdit={onEdit}
  >
    <div className={styles.detailGrid}>
      <DetailItem label="نام" value={profile.name} />
      <DetailItem
        label="نوع فعالیت"
        value={getVendorTypeLabel(profile.vendorType)}
      />
      <DetailItem label="وضعیت" value={<Badge tone="success">فعال</Badge>} />
    </div>
    <p className={styles.previewText}>
      {profile.description || "معرفی کوتاهی برای فروشگاه ثبت نشده است."}
    </p>
  </ProfileSectionCard>
);

export default StoreInfoSection;
