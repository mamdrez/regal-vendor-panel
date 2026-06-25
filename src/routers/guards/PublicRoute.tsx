import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/routers/paths";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * Wraps auth pages (login/signup). Already-authenticated users are redirected
 * away — to onboarding if pending, otherwise to the dashboard.
 */
const PublicRoute: FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to={user?.onboardingCompleted ? paths.dashboard : paths.onboarding}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
