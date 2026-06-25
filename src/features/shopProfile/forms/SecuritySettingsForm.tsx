import type { FC } from "react";
import type { SecuritySettings } from "../types/shopProfile.types";
import type { ProfileSectionFormProps } from "./formTypes";
import SettingToggle from "./SettingToggle";
import styles from "./forms.module.css";

const SecuritySettingsForm: FC<ProfileSectionFormProps> = ({
  value,
  onChange,
}) => {
  const setSecurity = <K extends keyof SecuritySettings>(
    key: K,
    val: SecuritySettings[K],
  ) => onChange({ ...value, security: { ...value.security, [key]: val } });

  return (
    <div className={styles.formStack}>
      <div className={styles.toggleList}>
        <SettingToggle
          title="ورود دو مرحله‌ای"
          description="برای ورود به پنل، علاوه بر رمز عبور یک کد یک‌بارمصرف نیز لازم است."
          checked={value.security.twoFactorEnabled}
          onChange={(checked) => setSecurity("twoFactorEnabled", checked)}
        />
        <SettingToggle
          title="هشدار ورودهای جدید"
          description="هنگام ورود از دستگاه یا موقعیت ناشناس به شما اطلاع داده می‌شود."
          checked={value.security.loginAlertsEnabled}
          onChange={(checked) => setSecurity("loginAlertsEnabled", checked)}
        />
      </div>
      <p className={styles.hint}>
        تغییر رمز عبور در نسخه بعدی به سرویس حساب کاربری متصل می‌شود.
      </p>
    </div>
  );
};

export default SecuritySettingsForm;
