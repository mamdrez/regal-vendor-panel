import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/routers/paths";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * Allows the onboarding flow only for authenticated users who have not yet
 * completed it. Completed users are sent to the dashboard.
 */
const OnboardingRoute: FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace />;
  }

  if (user?.onboardingCompleted) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return <Outlet />;
};

export default OnboardingRoute;
