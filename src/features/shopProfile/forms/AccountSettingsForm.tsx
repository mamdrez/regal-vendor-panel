import type { FC } from "react";
import { Select } from "@/shared/ui";
import type {
  AccountSettings,
  PanelLanguage,
  StoreStatus,
} from "../types/shopProfile.types";
import type { ProfileSectionFormProps } from "./formTypes";
import styles from "./forms.module.css";

const languageOptions = [
  { value: "fa", label: "فارسی" },
  { value: "en", label: "انگلیسی" },
];

const statusOptions = [
  { value: "active", label: "فعال" },
  { value: "vacation", label: "تعطیلی موقت" },
];

const timezoneOptions = [
  { value: "Asia/Tehran", label: "تهران (GMT+3:30)" },
  { value: "Asia/Dubai", label: "دبی (GMT+4)" },
];

const AccountSettingsForm: FC<ProfileSectionFormProps> = ({
  value,
  onChange,
}) => {
  const setAccount = <K extends keyof AccountSettings>(
    key: K,
    val: AccountSettings[K],
  ) => onChange({ ...value, account: { ...value.account, [key]: val } });

  return (
    <div className={styles.formStack}>
      <div className={styles.grid}>
        <Select
          label="زبان پنل"
          options={languageOptions}
          value={value.account.language}
          onChange={(event) =>
            setAccount("language", event.target.value as PanelLanguage)
          }
        />
        <Select
          label="منطقه زمانی"
          options={timezoneOptions}
          value={value.account.timezone}
          onChange={(event) => setAccount("timezone", event.target.value)}
        />
        <Select
          label="وضعیت فروشگاه"
          options={statusOptions}
          value={value.account.storeStatus}
          onChange={(event) =>
            setAccount("storeStatus", event.target.value as StoreStatus)
          }
        />
      </div>
      <p className={styles.hint}>
        در حالت «تعطیلی موقت»، فروشگاه شما برای خریداران رگال غیرفعال نمایش داده
        می‌شود.
      </p>
    </div>
  );
};

export default AccountSettingsForm;
