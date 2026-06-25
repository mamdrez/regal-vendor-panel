/** Credentials submitted on the login form. */
export interface LoginFormValues {
  identifier: string; // email or phone
  password: string;
}

/** Values submitted on the sign up form. */
export interface SignupFormValues {
  fullName: string;
  identifier: string; // email or phone
  password: string;
  confirmPassword: string;
}

/** The authenticated vendor user. */
export interface UserProfile {
  id: string;
  fullName: string;
  identifier: string;
  /** Whether the user has finished the onboarding intro questions. */
  onboardingCompleted: boolean;
}

/** Shape returned by the (mock) auth endpoints. */
export interface AuthResponse {
  token: string;
  user: UserProfile;
}
