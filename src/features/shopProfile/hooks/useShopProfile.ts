import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/shared/utils/toast";
import { shopProfileMockApi } from "../services/shopProfileMockApi";
import type { ShopProfile } from "../types/shopProfile.types";

const shopProfileKey = ["shop-profile"] as const;

export const useShopProfile = () =>
  useQuery({
    queryKey: shopProfileKey,
    queryFn: () => shopProfileMockApi.getProfile(),
  });

export const useSaveShopProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile: ShopProfile) =>
      shopProfileMockApi.saveProfile(profile),
    onSuccess: (saved) => {
      queryClient.setQueryData(shopProfileKey, saved);
      notify.success("اطلاعات فروشگاه ذخیره شد.");
    },
    onError: () => notify.error("ذخیره اطلاعات ناموفق بود."),
  });
};
