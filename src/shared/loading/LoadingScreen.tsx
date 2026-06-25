import styles from "./styles.module.css";
import LoadingCircle from "./LoadingCircle";

const LoadingScreen = ({ loadingPage = false }: { loadingPage?: boolean }) => {
  return (
    <div
      className={`${styles.loadingPage} ${
        loadingPage ? styles.loadingOverPage : ""
      }`}
    >
      <LoadingCircle type="secondary" borderSize={3} />
    </div>
  );
};

export default LoadingScreen;
