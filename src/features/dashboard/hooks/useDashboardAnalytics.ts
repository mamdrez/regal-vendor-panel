import { useQuery } from "@tanstack/react-query";
import { dashboardMockApi } from "../services/dashboardMockApi";

export const useDashboardAnalytics = () =>
  useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: () => dashboardMockApi.getAnalytics(),
  });
