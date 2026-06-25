import { useCallback, useMemo, useState, type FC, type ReactNode } from "react";
import { authMockApi } from "../services/authMockApi";
import { authStorage } from "../services/authStorage";
import type {
  LoginFormValues,
  SignupFormValues,
  UserProfile,
} from "../types/auth.types";
import { AuthContext, type AuthContextValue } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() =>
    authStorage.getToken() ? authStorage.getUser() : null,
  );

  const login = useCallback(async (values: LoginFormValues) => {
    const { token, user: nextUser } = await authMockApi.login(values);
    authStorage.setToken(token);
    authStorage.setUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const signup = useCallback(async (values: SignupFormValues) => {
    const { token, user: nextUser } = await authMockApi.signup(values);
    authStorage.setToken(token);
    authStorage.setUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    authStorage.clear();
    setUser(null);
  }, []);

  const markOnboardingCompleted = useCallback(() => {
    setUser((current) => {
      if (!current) return current;
      const updated: UserProfile = { ...current, onboardingCompleted: true };
      authStorage.setUser(updated);
      return updated;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
      markOnboardingCompleted,
    }),
    [user, login, signup, logout, markOnboardingCompleted],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
