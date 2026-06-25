import type { FC } from "react";
import AppProviders from "@/app/providers/AppProviders";
import AppRoutes from "@/routers/Routes";

const App: FC = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);

export default App;
