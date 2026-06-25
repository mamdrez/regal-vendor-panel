import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/routers/paths";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * Guards the vendor panel: unauthenticated users go to login, authenticated
 * users who have not finished onboarding are sent to the onboarding flow.
 */
const ProtectedRoute: FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace />;
  }

  if (user && !user.onboardingCompleted) {
    return <Navigate to={paths.onboarding} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
