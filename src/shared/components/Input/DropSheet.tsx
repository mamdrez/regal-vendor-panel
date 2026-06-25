import styles from "./styles.module.css";
import Icons from "@/shared/icons";
const DropSheet = ({
  label,
  value,
  onClick,
  error,
  errorMsg,
}: {
  label: string;
  value: string;
  error: boolean;
  errorMsg: string;
  onClick?: () => void | undefined;
}) => {
  return (
    <div className={styles.contentInput} onClick={onClick}>
      <div className={styles.dropSheetLabel}>{label}</div>
      <div
        className={`${styles.dropSheetValue} ${error ? styles.errorInput : ""}`}
      >
        <span>{value}</span>
        <Icons name="arrow-bottom" size={8} color="#000" isFill />
      </div>
      {error && <span className={styles.error}>{errorMsg}</span>}
    </div>
  );
};

export default DropSheet;
