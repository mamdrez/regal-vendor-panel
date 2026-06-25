import { useEffect, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button, Icon } from "@/shared/ui";
import styles from "./ResponsiveEditPanel.module.css";

interface ResponsiveEditPanelProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
  isSaving?: boolean;
  saveLabel?: string;
  showFooter?: boolean;
}

const ResponsiveEditPanel: FC<ResponsiveEditPanelProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSave,
  isSaving = false,
  saveLabel = "ذخیره تغییرات",
  showFooter = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="responsive-edit-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="responsive-edit-panel-title" className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="برگشت"
          >
            <span className={styles.desktopCloseIcon}>
              <Icon name="close" size={20} />
            </span>
            <span className={styles.mobileBackIcon}>
              <Icon name="arrow-right" size={20} />
            </span>
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        {showFooter && (
          <div className={styles.footer}>
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              انصراف
            </Button>
            <Button onClick={onSave} isLoading={isSaving}>
              {saveLabel}
            </Button>
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
};

export default ResponsiveEditPanel;
