import type { FC } from "react";
import type { NotificationSettings } from "../types/shopProfile.types";
import type { ProfileSectionFormProps } from "./formTypes";
import SettingToggle from "./SettingToggle";
import styles from "./forms.module.css";

const NotificationSettingsForm: FC<ProfileSectionFormProps> = ({
  value,
  onChange,
}) => {
  const setNotification = <K extends keyof NotificationSettings>(
    key: K,
    val: NotificationSettings[K],
  ) =>
    onChange({
      ...value,
      notifications: { ...value.notifications, [key]: val },
    });

  return (
    <div className={styles.toggleList}>
      <SettingToggle
        title="سفارش جدید"
        description="برای سفارش‌های تازه و تغییر وضعیت سفارش‌ها اطلاع‌رسانی می‌شود."
        checked={value.notifications.newOrders}
        onChange={(checked) => setNotification("newOrders", checked)}
      />
      <SettingToggle
        title="هشدار موجودی کم"
        description="وقتی موجودی تنوع‌های محصول پایین باشد به شما اطلاع داده می‌شود."
        checked={value.notifications.lowStock}
        onChange={(checked) => setNotification("lowStock", checked)}
      />
      <SettingToggle
        title="وضعیت تایید محصول"
        description="نتیجه بررسی و تایید محصولات ارسالی به رگال اطلاع داده می‌شود."
        checked={value.notifications.productStatus}
        onChange={(checked) => setNotification("productStatus", checked)}
      />
      <SettingToggle
        title="گزارش هفتگی"
        description="خلاصه عملکرد فروشگاه به‌صورت هفتگی برای شما ارسال می‌شود."
        checked={value.notifications.weeklyReport}
        onChange={(checked) => setNotification("weeklyReport", checked)}
      />
    </div>
  );
};

export default NotificationSettingsForm;
