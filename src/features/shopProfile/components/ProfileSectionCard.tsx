import type { FC, ReactNode } from "react";
import { Button, Card, Icon } from "@/shared/ui";
import styles from "./ProfileSectionCard.module.css";

interface ProfileSectionCardProps {
  title: string;
  description?: string;
  /** Optional edit action; omit for read-only/custom-header sections. */
  actionLabel?: string;
  onEdit?: () => void;
  children: ReactNode;
}

/**
 * Generic preview card used by every profile section: a titled, optionally
 * editable container that keeps the section header consistent across the page.
 */
const ProfileSectionCard: FC<ProfileSectionCardProps> = ({
  title,
  description,
  actionLabel = "ویرایش",
  onEdit,
  children,
}) => (
  <Card padding="lg" className={styles.card}>
    <header className={styles.header}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {onEdit && (
        <Button
          variant="outline"
          leadingIcon={<Icon name="edit" size={16} />}
          onClick={onEdit}
        >
          {actionLabel}
        </Button>
      )}
    </header>
    {children}
  </Card>
);

export default ProfileSectionCard;
