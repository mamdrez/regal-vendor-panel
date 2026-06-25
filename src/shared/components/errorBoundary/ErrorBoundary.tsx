import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./styles.module.css";
import { Avatar } from "@/assets/images";
import Button from "../button/Button";

export type ErrorWithTitle = Error & {
  title?: string;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: ErrorWithTitle | null;
};

const normalizeError = (error: unknown): ErrorWithTitle => {
  if (error instanceof Error) return error as ErrorWithTitle;
  if (error && typeof error === "object") return error as ErrorWithTitle;

  return {
    name: "Error",
    message: String(error),
  } as ErrorWithTitle;
};

const getErrorTitle = (error: ErrorWithTitle) => {
  if (error.title) return error.title;
  if (error.name && error.name !== "Error") return error.name;
  return "خطایی رخ داده است";
};

export const ErrorFallback = ({ error }: { error: unknown }) => {
  const normalizedError = normalizeError(error);

  return (
    <main className={styles.errorBoundary} role="alert">
      <section className={styles.errorCard}>
        <img src={Avatar} alt="" width={250} />
        <div className={styles.errorCardDeep}>
          <span className={styles.badge}>خطا</span>
          <h1 className={styles.title}>{getErrorTitle(normalizedError)}</h1>
          {normalizedError.message ? (
            <p className={styles.message}>{normalizedError.message}</p>
          ) : null}
          <div className={styles.action}>
            <Button
              text="تلاش دوباره"
              color="black"
              borderRadius={50}
              height={3}
              width={15}
              fontSize={0.9}
              handleClick={() => window.location.reload()}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: ErrorWithTitle): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return <ErrorFallback error={error} />;
  }
}

export default ErrorBoundary;
