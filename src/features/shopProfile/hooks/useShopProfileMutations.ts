import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/shared/utils/toast";
import { shopProfileMockApi } from "../services/shopProfileMockApi";
import type {
  CreateBranchPayload,
  ShopProfile,
  UpdateBranchPayload,
} from "../types/shopProfile.types";
import { shopProfileKey } from "./useShopProfile";

/**
 * Bundles every shop-profile write into a single hook. Each mutation writes the
 * returned profile straight into the query cache so the UI stays in sync
 * without a refetch, and surfaces Persian success/error toasts.
 */
export const useShopProfileMutations = () => {
  const queryClient = useQueryClient();

  const syncCache = (saved: ShopProfile) => {
    queryClient.setQueryData(shopProfileKey, saved);
  };

  const saveProfile = useMutation({
    mutationFn: (profile: ShopProfile) =>
      shopProfileMockApi.saveProfile(profile),
    onSuccess: (saved) => {
      syncCache(saved);
      notify.success("اطلاعات فروشگاه ذخیره شد.");
    },
    onError: () => notify.error("ذخیره اطلاعات ناموفق بود."),
  });

  const createBranch = useMutation({
    mutationFn: (payload: CreateBranchPayload) =>
      shopProfileMockApi.createBranch(payload),
    onSuccess: (saved) => {
      syncCache(saved);
      notify.success("شعبه جدید اضافه شد.");
    },
    onError: () => notify.error("افزودن شعبه ناموفق بود."),
  });

  const updateBranch = useMutation({
    mutationFn: (payload: UpdateBranchPayload) =>
      shopProfileMockApi.updateBranch(payload),
    onSuccess: (saved) => {
      syncCache(saved);
      notify.success("اطلاعات شعبه به‌روزرسانی شد.");
    },
    onError: () => notify.error("به‌روزرسانی شعبه ناموفق بود."),
  });

  const deleteBranch = useMutation({
    mutationFn: (branchId: string) => shopProfileMockApi.deleteBranch(branchId),
    onSuccess: (saved) => {
      syncCache(saved);
      notify.success("شعبه حذف شد.");
    },
    onError: () => notify.error("حذف شعبه ناموفق بود."),
  });

  return { saveProfile, createBranch, updateBranch, deleteBranch };
};
