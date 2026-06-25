import type { FC } from "react";
import { Input } from "@/shared/ui";
import type { ShopProfile } from "../types/shopProfile.types";
import type { ProfileSectionFormProps } from "./formTypes";
import styles from "./forms.module.css";

const ContactInfoForm: FC<ProfileSectionFormProps> = ({ value, onChange }) => {
  const set = <K extends keyof ShopProfile>(key: K, val: ShopProfile[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <div className={styles.grid}>
      <Input
        label="شماره تماس"
        placeholder="09xxxxxxxxx"
        value={value.phone ?? ""}
        onChange={(event) => set("phone", event.target.value)}
        dir="ltr"
      />
      <Input
        label="ایمیل"
        placeholder="shop@mail.com"
        value={value.email ?? ""}
        onChange={(event) => set("email", event.target.value)}
        dir="ltr"
      />
      <Input
        label="وب‌سایت"
        placeholder="https://"
        value={value.website ?? ""}
        onChange={(event) => set("website", event.target.value)}
        dir="ltr"
      />
    </div>
  );
};

export default ContactInfoForm;
