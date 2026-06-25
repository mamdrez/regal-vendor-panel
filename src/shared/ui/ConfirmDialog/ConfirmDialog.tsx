import type { FC } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "تایید",
  cancelLabel = "انصراف",
  isLoading = false,
  onConfirm,
  onClose,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    width={26}
    footer={
      <>
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant="primary" onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    <p className={styles.message}>{message}</p>
  </Modal>
);

export default ConfirmDialog;
