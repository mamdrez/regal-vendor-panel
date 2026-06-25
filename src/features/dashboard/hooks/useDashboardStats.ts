import { useQuery } from "@tanstack/react-query";
import { dashboardMockApi } from "../services/dashboardMockApi";

export const useDashboardStats = () =>
  useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => dashboardMockApi.getStats(),
  });
