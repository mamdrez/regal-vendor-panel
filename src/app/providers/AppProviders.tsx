import type { FC, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { queryClient } from "@/shared/services/queryClient";
import AuthProvider from "@/features/auth/context/AuthProvider";

interface AppProvidersProps {
  children: ReactNode;
}

/** Composes the global providers (data fetching, routing, auth state). */
const AppProviders: FC<AppProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer
        position="top-center"
        rtl
        autoClose={2600}
        hideProgressBar
        newestOnTop
        closeButton={false}
      />
    </BrowserRouter>
  </QueryClientProvider>
);

export default AppProviders;
