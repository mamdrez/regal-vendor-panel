import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.css";
import Icons from "@/shared/icons";

export interface IModalProps {
  open: boolean;
  onClose: () => void;
}

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  height?: number;
  unit?: string;
  needScroll?: boolean;
  portalTarget?: HTMLElement;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  title,
  width,
  height,
  unit,
  needScroll,
  description,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const closeModal = (e: any) => {
    if (e.target.id === "overlay") {
      onClose();
    }
  };

  if (!open || !mounted) return null;

  const modalContent = (
    <div
      className={styles.modal}
      onClick={(e) => {
        closeModal(e);
      }}
      id="overlay">
      <div
        className={styles.modalDeep}
        style={{
          width: `${width}${unit}`,
          height: `${height}${unit}`,
          overflowY: needScroll ? "scroll" : "unset",
        }}>
        <div className={styles.modalNavbar}>
          <div className={styles.modalInfo}>
            <div className={styles.modalTitle}>{title}</div>
            {description && (
              <div className={styles.modalDes}>{description}</div>
            )}
          </div>
          <div className={styles.closeIcon}>
            <Icons name="Close" color="#000" size={18} onClick={onClose} cursor="pointer" />
          </div>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("root") || document.body
  );
};

export default Modal;
