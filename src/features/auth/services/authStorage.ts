import type { UserProfile } from "../types/auth.types";

/**
 * Thin wrapper around localStorage for auth persistence. Centralised so the
 * storage keys live in one place and can be swapped for cookies/secure storage
 * later without touching feature code.
 */
const TOKEN_KEY = "regal_vendor_token";
const USER_KEY = "regal_vendor_user";

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getUser(): UserProfile | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  },
  setUser(user: UserProfile): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
