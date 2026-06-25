import { delay } from "@/shared/utils/delay";
import type {
  AuthResponse,
  LoginFormValues,
  SignupFormValues,
} from "../types/auth.types";

/**
 * Mock auth service. Simulates async network behaviour with a small delay and
 * keeps the same shape a real API service would have, so it can be replaced
 * with Axios calls later without changing the call sites.
 */

const createToken = (): string =>
  `mock-token-${Math.random().toString(36).slice(2)}`;

const isValidIdentifier = (value: string): boolean => {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone = /^0?9\d{9}$/;
  return email.test(value) || phone.test(value.replace(/\s/g, ""));
};

export const authMockApi = {
  async login(values: LoginFormValues): Promise<AuthResponse> {
    await delay(900);

    if (!isValidIdentifier(values.identifier)) {
      throw new Error("ایمیل یا شماره موبایل معتبر نیست.");
    }
    if (values.password.length < 6) {
      throw new Error("ایمیل/شماره موبایل یا رمز عبور اشتباه است.");
    }

    return {
      token: createToken(),
      user: {
        id: "vendor-1",
        fullName: "فروشنده رگال",
        identifier: values.identifier,
        // Returning users already passed onboarding in this mock.
        onboardingCompleted: true,
      },
    };
  },

  async signup(values: SignupFormValues): Promise<AuthResponse> {
    await delay(1000);

    if (!isValidIdentifier(values.identifier)) {
      throw new Error("ایمیل یا شماره موبایل معتبر نیست.");
    }

    return {
      token: createToken(),
      user: {
        id: `vendor-${Math.random().toString(36).slice(2, 8)}`,
        fullName: values.fullName,
        identifier: values.identifier,
        // New users must complete onboarding before entering the panel.
        onboardingCompleted: false,
      },
    };
  },
};
