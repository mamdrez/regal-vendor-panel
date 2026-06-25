import Lottie from "react-lottie-player";
import dot from "./lottie/doted.json";
import dotedPrimary from "./lottie/dotedPrimary.json";
import styles from "./styles.module.css";
const LoadingDotted = ({ primary }: { primary?: boolean }) => {
  return (
      <Lottie
        loop
        animationData={primary ? dotedPrimary : dot}
        play
        className={styles.loadingDot}
      />
  );
};

export default LoadingDotted;
