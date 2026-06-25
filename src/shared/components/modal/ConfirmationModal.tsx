import { FC, ReactElement } from "react";
import styles from "./style.module.css";
// components
import Modal, { IModalProps } from "@/shared/components/modal/Modal";
import Button, { IButtonProps } from "@/shared/components/button/Button";
import IconBg from "@/shared/icons/IconBg";
import Icons from "@/shared/icons";

interface IProps extends IModalProps {
  title: string;
  message: string;
  iconBgColor: string;
  iconName: string;
  iconColor: string;
  triggerButton: ReactElement<IButtonProps>;
  confirmButton: ReactElement<IButtonProps>;
}

const ConfirmationModal: FC<IProps> = ({
  open,
  onClose,
  title,
  message,
  iconBgColor,
  iconColor,
  iconName,
  triggerButton,
  confirmButton,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onClose={onClose}
        width={25}
        height={16}
        unit="rem"
      >
        <div className={styles.confirmationModalContainer}>
          <div className={styles.confirmationIconTextContainer}>
            <IconBg color={iconBgColor} minWidth={3} height={3}>
              <Icons name={iconName} color={iconColor} size={28} isFill />
            </IconBg>
            <span>{message}</span>
          </div>

          <div className={styles.confirmationActionBtns}>
            {confirmButton}
            <Button
              text="لغو"
              color="transparent"
              handleClick={onClose}
              width={7}
              height={2.4}
            />
          </div>
        </div>
      </Modal>
      {triggerButton}
    </>
  );
};

export default ConfirmationModal;
