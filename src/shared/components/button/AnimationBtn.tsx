import React from "react";

import styles from "./styles.module.css";

const AnimationBtn = ({
  children,
  animate,
}: {
  children: React.ReactNode;
  animate: boolean;
}) => {
  return (
    <div className={animate ? styles.activeAnimate : styles.disabledAnimate}>
      {children}
    </div>
  );
};

export default AnimationBtn;
