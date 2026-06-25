import { useQuery } from "@tanstack/react-query";
import { vendorOnboardingMockApi } from "../services/vendorOnboardingMockApi";

export const useCategories = () =>
  useQuery({
    queryKey: ["onboarding", "categories"],
    queryFn: () => vendorOnboardingMockApi.getCategories(),
  });

export const useBrands = () =>
  useQuery({
    queryKey: ["onboarding", "brands"],
    queryFn: () => vendorOnboardingMockApi.getBrands(),
  });
