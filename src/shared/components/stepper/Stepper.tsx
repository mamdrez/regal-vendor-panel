import React, { ReactNode } from "react";
import styles from "./styles.module.css";

export type Step = {
  id: number;
  title: string;
  icon: ReactNode;
  component?: ReactNode;
  visible: boolean;
};

export type IProps = {
  steps: Step[];
  currentStepId: number;
  onStepClick?: (stepId: number) => void;
  showProgressDots?: boolean;
  stepClickable?: boolean;
};

const Stepper: React.FC<IProps> = ({
  steps,
  currentStepId,
  onStepClick,
  showProgressDots = true,
  stepClickable = false,
}) => {
  const VISIBLE_STEPS = steps.filter((step) => step.visible);

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepHeader}>
        {VISIBLE_STEPS.map((step, index) => {
          const isActive = step.id === currentStepId;
          const isCompleted = step.id < currentStepId;

          return (
            <React.Fragment key={step.id}>
              <div className={styles.iconTitleContainer}>
                <div
                  className={`${styles.stepCircle} ${
                    isActive
                      ? styles.active
                      : isCompleted
                      ? styles.completed
                      : ""
                  }`}
                  onClick={() => onStepClick?.(step.id)}
                  style={{ pointerEvents: stepClickable ? "all" : "none" }}
                >
                  {step.icon}
                </div>
                <span
                  className={`${styles.stepTitle} ${
                    isActive ? styles.stepTitleActive : ""
                  }`}
                >
                  {step?.title}
                </span>
              </div>
              {index < VISIBLE_STEPS.length - 1 && (
                <div
                  className={`${styles.line} ${
                    isActive
                      ? styles.lineActive
                      : isCompleted
                      ? styles.lineCompleted
                      : ""
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.stepContent}>
        {VISIBLE_STEPS.find((s) => s.id === currentStepId)?.component}
      </div>

      {showProgressDots && (
        <div className={styles.stepDots}>
          {VISIBLE_STEPS.map((step) => (
            <span
              key={step.id}
              className={`${styles.dot} ${
                currentStepId > step.id
                  ? styles.dotCompleted
                  : currentStepId === step.id
                  ? styles.dotActive
                  : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Stepper;
