import styles from "./styles.module.css";

type Loading = "primary" | "secondary" | "tertiary";
const LoadingCircle = ({
  type = "primary",
  borderSize = 5,
  size = 25,
}: {
  type?: Loading;
  borderSize?: number;
  size?: number;
}) => {
  return (
      <div
        className={`${styles.loadingSpinner} ${styles[type]}`}
        style={{
          borderWidth: `${borderSize}px`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
  );
};

export default LoadingCircle;
