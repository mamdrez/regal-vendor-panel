import { useState, type FC, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@/shared/ui";
import { paths } from "@/routers/paths";
import { useAuth } from "../hooks/useAuth";
import type { SignupFormValues } from "../types/auth.types";
import styles from "./AuthForm.module.css";

const initialValues: SignupFormValues = {
  fullName: "",
  identifier: "",
  password: "",
  confirmPassword: "",
};

type FieldErrors = Partial<Record<keyof SignupFormValues, string>>;

const validate = (values: SignupFormValues): FieldErrors => {
  const errors: FieldErrors = {};
  if (values.fullName.trim().length < 3) {
    errors.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
  }
  if (!values.identifier.trim()) {
    errors.identifier = "ایمیل یا شماره موبایل را وارد کنید.";
  }
  if (values.password.length < 6) {
    errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "رمز عبور و تکرار آن یکسان نیست.";
  }
  return errors;
};

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [values, setValues] = useState<SignupFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof SignupFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await signup(values);
      navigate(paths.onboarding, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ثبت‌نام ناموفق بود. دوباره تلاش کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <h1 className={styles.title}>ساخت حساب فروشنده</h1>
        <p className={styles.subtitle}>
          فروشگاه خود را در رگال راه‌اندازی کنید.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          name="fullName"
          label="نام و نام خانوادگی"
          placeholder="نام کامل خود را وارد کنید"
          value={values.fullName}
          onChange={handleChange("fullName")}
          error={fieldErrors.fullName}
          autoComplete="name"
        />
        <Input
          name="identifier"
          label="ایمیل یا شماره موبایل"
          placeholder="example@mail.com یا 0912xxxxxxx"
          value={values.identifier}
          onChange={handleChange("identifier")}
          error={fieldErrors.identifier}
          autoComplete="username"
          dir="ltr"
        />
        <Input
          name="password"
          type="password"
          label="رمز عبور"
          placeholder="حداقل ۶ کاراکتر"
          value={values.password}
          onChange={handleChange("password")}
          error={fieldErrors.password}
          autoComplete="new-password"
          dir="ltr"
        />
        <Input
          name="confirmPassword"
          type="password"
          label="تکرار رمز عبور"
          placeholder="رمز عبور را دوباره وارد کنید"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          dir="ltr"
        />

        {error && <div className={styles.alert}>{error}</div>}

        <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
          ثبت‌نام
        </Button>
      </form>

      <p className={styles.switch}>
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link to={paths.login} className={styles.link}>
          وارد شوید
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
