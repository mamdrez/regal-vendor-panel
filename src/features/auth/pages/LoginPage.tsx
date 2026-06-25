import { useState, type FC, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@/shared/ui";
import { paths } from "@/routers/paths";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormValues } from "../types/auth.types";
import styles from "./AuthForm.module.css";

const initialValues: LoginFormValues = { identifier: "", password: "" };

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof LoginFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!values.identifier.trim() || !values.password.trim()) {
      setError("لطفاً همه فیلدها را تکمیل کنید.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(values);
      navigate(
        user.onboardingCompleted ? paths.dashboard : paths.onboarding,
        { replace: true },
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ورود ناموفق بود. دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <h1 className={styles.title}>ورود به پنل فروشندگان</h1>
        <p className={styles.subtitle}>
          برای مدیریت فروشگاه خود وارد حساب کاربری شوید.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          name="identifier"
          label="ایمیل یا شماره موبایل"
          placeholder="example@mail.com یا 0912xxxxxxx"
          value={values.identifier}
          onChange={handleChange("identifier")}
          autoComplete="username"
          dir="ltr"
        />
        <Input
          name="password"
          type="password"
          label="رمز عبور"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange("password")}
          autoComplete="current-password"
          dir="ltr"
        />

        {error && <div className={styles.alert}>{error}</div>}

        <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
          ورود
        </Button>
      </form>

      <p className={styles.switch}>
        حساب کاربری ندارید؟{" "}
        <Link to={paths.signup} className={styles.link}>
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
