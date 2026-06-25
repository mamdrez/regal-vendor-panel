import type { FC } from "react";
import { Icon } from "@/shared/ui";
import type { ShopProfile } from "../../types/shopProfile.types";
import {
  getCategoryLabels,
  getSoldBrandLabels,
} from "../../utils/shopProfileMappers";
import ProfileSectionCard from "../ProfileSectionCard";
import { ChipList } from "./SectionPrimitives";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const BrandsSection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="برندها و دسته‌بندی‌ها"
    description="حوزه فعالیت فروشگاه و برندهایی که برای خریداران رگال نمایش داده می‌شوند."
    actionLabel="ویرایش دسته‌بندی"
    onEdit={onEdit}
  >
    <div className={styles.stack}>
      <div>
        <h3 className={styles.subTitle}>دسته‌بندی‌های فعالیت</h3>
        <ChipList
          values={getCategoryLabels(profile)}
          emptyText="هنوز دسته‌بندی فعالیتی انتخاب نشده است."
        />
      </div>

      {profile.vendorType === "seller" ? (
        <div>
          <h3 className={styles.subTitle}>برندهای قابل فروش</h3>
          <ChipList
            values={getSoldBrandLabels(profile)}
            emptyText="هنوز برندی برای فروش ثبت نشده است."
          />
        </div>
      ) : (
        <div className={styles.brandOwnerNote}>
          <Icon name="tag" size={18} />
          <span>این پروفایل به‌عنوان صاحب برند مدیریت می‌شود.</span>
        </div>
      )}
    </div>
  </ProfileSectionCard>
);

export default BrandsSection;
