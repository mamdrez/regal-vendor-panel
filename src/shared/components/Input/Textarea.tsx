import { FC } from "react";
import styles from "./styles.module.css";
import Icons from "@/shared/icons";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: boolean;
  handleVisible?: () => void;
  handleFocus?: () => void;
  error?: string;
  fontFamily?: string;
  fontSize?: number;
  height?: number;
}

const Textarea: FC<IProps> = ({
  label,
  icon,
  handleVisible,
  handleFocus,
  error,
  fontFamily,
  fontSize,
  height,
  ...inputProps
}) => {
  return (
    <div onClick={handleVisible} className={styles.contentInput}>
      {label && <label>{label}</label>}
      <textarea
        style={{
          fontFamily: fontFamily,
          fontWeight: fontFamily?.includes("vazir-number") ? "bold" : "normal",
          fontSize: `${fontSize}rem`,
          height: `${height}rem`,
        }}
        className={error ? styles.errorInput : ""}
        {...inputProps}
      />
      {icon && (
        <div className={styles.arrowBottom}>
          <Icons name="arrow-bottom" size={8} color="#000" isFill />
        </div>
      )}
      {error && <span className={styles.error}>{"این فیلد الزامی است"}</span>}
    </div>
  );
};

export default Textarea;
