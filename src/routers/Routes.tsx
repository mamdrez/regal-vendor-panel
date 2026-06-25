import type { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import VendorLayout from "@/layouts/VendorLayout/VendorLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import OnboardingPage from "@/features/onboarding/pages/OnboardingPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProductsListPage from "@/features/products/pages/ProductsListPage";
import ProductFormPage from "@/features/products/pages/ProductFormPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import CollectionsPage from "@/features/collections/pages/CollectionsPage";
import DiscountsPage from "@/features/discounts/pages/DiscountsPage";
import ShopProfilePage from "@/features/shopProfile/pages/ShopProfilePage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";
import OnboardingRoute from "./guards/OnboardingRoute";
import { paths } from "./paths";

const AppRoutes: FC = () => (
  <Routes>
    {/* Public auth pages */}
    <Route element={<PublicRoute />}>
      <Route element={<AuthLayout />}>
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.signup} element={<SignupPage />} />
      </Route>
    </Route>

    {/* Onboarding (authenticated, not yet completed) */}
    <Route element={<OnboardingRoute />}>
      <Route path={paths.onboarding} element={<OnboardingPage />} />
    </Route>

    {/* Protected vendor panel */}
    <Route element={<ProtectedRoute />}>
      <Route element={<VendorLayout />}>
        <Route path={paths.dashboard} element={<DashboardPage />} />
        <Route path={paths.products} element={<ProductsListPage />} />
        <Route path={paths.productNew} element={<ProductFormPage />} />
        <Route path={paths.productEditPattern} element={<ProductFormPage />} />
        <Route path={paths.orders} element={<OrdersPage />} />
        <Route
          path={paths.inventory}
          element={<Navigate to={`${paths.products}?tab=inventory`} replace />}
        />
        <Route path={paths.collections} element={<CollectionsPage />} />
        <Route path={paths.discounts} element={<DiscountsPage />} />
        <Route path={paths.shopProfile} element={<ShopProfilePage />} />
        <Route path={paths.analytics} element={<Navigate to={paths.dashboard} replace />} />
        <Route path={paths.notifications} element={<NotificationsPage />} />
        <Route path={paths.settings} element={<Navigate to={paths.shopProfile} replace />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to={paths.dashboard} replace />} />
  </Routes>
);

export default AppRoutes;
