import Lottie from "react-lottie-player";
import styles from "./styles.module.css";
import Circle from "./lottie/lottery.json";

const LoadingLottery = ({ play }: any) => {
  return (
    <div className={styles.loadingLotteryContainer}>
      <Lottie
        loop
        animationData={Circle}
        play={play}
        className={styles.LotteryFetch}
      />
    </div>
  );
};

export default LoadingLottery;
