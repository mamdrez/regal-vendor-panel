import type { FC } from "react";
import { Badge, Button, Icon } from "@/shared/ui";
import type { ShopProfile } from "../types/shopProfile.types";
import styles from "./ProfileHero.module.css";

interface ProfileHeroProps {
  profile: ShopProfile;
  completion: number;
  onEdit: () => void;
}

const getVendorTypeLabel = (vendorType: ShopProfile["vendorType"]) =>
  vendorType === "brand_owner" ? "صاحب برند" : "فروشنده چندبرندی";

const ProfileHero: FC<ProfileHeroProps> = ({ profile, completion, onEdit }) => {
  const activeBranches = profile.branches.filter((branch) => branch.isActive);

  return (
    <section className={styles.hero}>
      <div className={styles.cover}>
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="" className={styles.coverImage} />
        ) : (
          <div className={styles.coverFallback}>
            <span>Regal Vendor Profile</span>
          </div>
        )}
      </div>

      <div className={styles.profileBlock}>
        <div className={styles.logoWrap}>
          {profile.logo ? (
            <img src={profile.logo} alt="" className={styles.logo} />
          ) : (
            <div className={styles.logoFallback}>
              <Icon name="shop" size={34} />
            </div>
          )}
        </div>

        <div className={styles.identity}>
          <div className={styles.titleRow}>
            <div>
              <h1 className={styles.name}>{profile.name || "نام فروشگاه"}</h1>
              <div className={styles.meta}>
                <Badge tone="primary">{getVendorTypeLabel(profile.vendorType)}</Badge>
                <span>{activeBranches.length} شعبه فعال</span>
              </div>
            </div>
            <Button
              variant="outline"
              leadingIcon={<Icon name="edit" size={17} />}
              onClick={onEdit}
            >
              ویرایش هویت
            </Button>
          </div>

          <p className={styles.description}>
            {profile.description ||
              "یک معرفی کوتاه برای برند یا فروشگاه شما اینجا نمایش داده می‌شود."}
          </p>
        </div>

        <aside className={styles.statusCard}>
          <span className={styles.statusLabel}>تکمیل پروفایل</span>
          <strong className={styles.statusValue}>{completion}٪</strong>
          <div className={styles.progressTrack}>
            <span
              className={styles.progressValue}
              style={{ inlineSize: `${completion}%` }}
            />
          </div>
          <p>اطلاعات کامل‌تر، اعتماد خریداران و کیفیت نمایش در رگال را بهتر می‌کند.</p>
        </aside>
      </div>
    </section>
  );
};

export default ProfileHero;
