import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.css";

export interface IModalProps {
  open: boolean;
  onClose: () => void;
}

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
  unit?: string;
  needScroll?: boolean;
  portalTarget?: HTMLElement;
}

const ModalWrapper: React.FC<ModalProps> = ({ children, open, onClose }) => {
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
      className={styles.modalWrapper}
      onClick={(e) => {
        closeModal(e);
      }}
      id="overlay"
    >
      {children}
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("root") || document.body,
  );
};

export default ModalWrapper;
