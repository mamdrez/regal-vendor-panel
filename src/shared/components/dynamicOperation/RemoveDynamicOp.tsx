import { FC } from "react";
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/button/Button";
import styles from "@/assets/css/layout.module.css";
import Icons from "@/shared/icons";

interface IProps {
  open: boolean;
  handleVisible: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  onClose?: () => void;
}

const RemoveModal: FC<IProps> = ({
  open,
  handleVisible,
  onConfirm,
  isLoading,
  onClose,
}) => {
  const handleClose = () => {
    handleVisible();
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="خروج"
      width={25}
      height={16}
      unit="rem"
    >
      <div className={styles.logoutModal}>
        <div className={styles.logoutModalContent}>
          <div className={styles.iconcontainer}>
            <Icons name="Trash" color="#e11900" size={32} isFill />
          </div>
          <p className={styles.confirmParagraph}>
            آیا از حذف این آیتم اطمینان دارید ؟
          </p>
        </div>
        <div className={styles.modalBtnDelete}>
          <Button
            text="حذف"
            width={7}
            height={2.4}
            handleClick={onConfirm}
            isLoading={isLoading}
            color="primary"
          />
          <Button
            text="لغو"
            width={7}
            height={2.4}
            handleClick={handleClose}
            color="secondary"
          />
        </div>
      </div>
    </Modal>
  );
};

export default RemoveModal;
