import styles from "./css/styles.module.css";
import Icons from "@/shared/icons";

interface IProps {
  msg?: string;
  minHeight?: number;
}
const EmptyMsg: React.FC<IProps> = ({
  msg = "هیچ اطلاعاتی یافت نشد",
  minHeight,
}) => {
  return (
    <div className={styles.emptyMsg} style={{ minHeight: `${minHeight}rem` }}>
      <Icons name="exclamation-circle" color="#848484ff" size={22} isFill />
      {msg}
    </div>
  );
};

export default EmptyMsg;
