import type { FC } from "react";
import { Icon } from "@/shared/ui";
import styles from "./AddProductStepper.module.css";

export interface StepperItem {
  label: string;
}

interface AddProductStepperProps {
  steps: StepperItem[];
  /** Zero-based index of the active step. */
  current: number;
  /** Allows jumping back to an already-completed step. */
  onStepClick?: (index: number) => void;
}

const AddProductStepper: FC<AddProductStepperProps> = ({
  steps,
  current,
  onStepClick,
}) => (
  <ol className={styles.stepper}>
    {steps.map((step, index) => {
      const isDone = index < current;
      const isActive = index === current;
      const isClickable = isDone && Boolean(onStepClick);
      const state = isActive ? "active" : isDone ? "done" : "todo";

      return (
        <li key={step.label} className={styles.item} data-state={state}>
          <button
            type="button"
            className={styles.node}
            onClick={() => isClickable && onStepClick?.(index)}
            disabled={!isClickable}
            aria-current={isActive ? "step" : undefined}
          >
            <span className={styles.bullet}>
              {isDone ? (
                <Icon name="check" size={16} />
              ) : (
                (index + 1).toLocaleString("fa-IR")
              )}
            </span>
            <span className={styles.label}>{step.label}</span>
          </button>
          {index < steps.length - 1 && <span className={styles.line} />}
        </li>
      );
    })}
  </ol>
);

export default AddProductStepper;
