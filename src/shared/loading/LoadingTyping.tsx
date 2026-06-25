import styles from "./styles.module.css";
import Typing from "./lottie/typing.json";
import Lottie from "react-lottie-player";

const LoadingTyping = () => {
  return (
    <div>
      <Lottie
        loop
        animationData={Typing}
        play
        className={styles.loadingScreen}
        style={{
          width: "6rem",
          height: "6rem",
        }}
      />
    </div>
  );
};

export default LoadingTyping;
