import { createContext } from "react";
import type {
  LoginFormValues,
  SignupFormValues,
  UserProfile,
} from "../types/auth.types";

export interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (values: LoginFormValues) => Promise<UserProfile>;
  signup: (values: SignupFormValues) => Promise<UserProfile>;
  logout: () => void;
  /** Marks onboarding as complete on the current user. */
  markOnboardingCompleted: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
