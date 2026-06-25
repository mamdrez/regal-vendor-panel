import { useQuery } from "@tanstack/react-query";
import { shopProfileMockApi } from "../services/shopProfileMockApi";

export const shopProfileKey = ["shop-profile"] as const;

export const useShopProfile = () =>
  useQuery({
    queryKey: shopProfileKey,
    queryFn: () => shopProfileMockApi.getProfile(),
  });
