import type { FC } from "react";
import type { ShopProfile } from "../../types/shopProfile.types";
import ProfileSectionCard from "../ProfileSectionCard";
import { StatusRow } from "./SectionPrimitives";
import styles from "./profileSections.module.css";

interface SectionProps {
  profile: ShopProfile;
  onEdit: () => void;
}

const NotificationsSection: FC<SectionProps> = ({ profile, onEdit }) => (
  <ProfileSectionCard
    title="اعلان‌ها"
    description="ترجیحات اطلاع‌رسانی فروشگاه، سفارش‌ها و موجودی محصولات."
    actionLabel="ویرایش اعلان‌ها"
    onEdit={onEdit}
  >
    <div className={styles.statusList}>
      <StatusRow
        icon="orders"
        title="اعلان سفارش جدید"
        description="برای سفارش‌های تازه و تغییر وضعیت سفارش‌ها نمایش داده می‌شود."
        enabled={profile.notifications.newOrders}
      />
      <StatusRow
        icon="alert-triangle"
        title="هشدار موجودی کم"
        description="وقتی موجودی تنوع‌های محصول پایین باشد، در پنل برجسته می‌شود."
        enabled={profile.notifications.lowStock}
      />
      <StatusRow
        icon="check"
        title="وضعیت تایید محصول"
        description="نتیجه بررسی و تایید محصولات ارسالی به رگال."
        enabled={profile.notifications.productStatus}
      />
      <StatusRow
        icon="bell"
        title="گزارش هفتگی"
        description="خلاصه عملکرد فروشگاه به‌صورت هفتگی."
        enabled={profile.notifications.weeklyReport}
      />
    </div>
  </ProfileSectionCard>
);

export default NotificationsSection;
