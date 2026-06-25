import styles from "./styles.module.css";
import Circle from "./lottie/circle.json";
import Lottie from "react-lottie-player";

const LoadingFetch = () => {
  return (
    <div className={styles.loadingFetchContainer}>
      <Lottie
        loop
        animationData={Circle}
        play
        className={styles.loadingFetch}
      />
    </div>
  );
};

export default LoadingFetch;
