import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/shared/utils/toast";
import { productsMockApi } from "../services/productsMockApi";
import { productKeys } from "./useProducts";
import type {
  AddVendorProductPayload,
  ProductFormValues,
  ProductStatus,
} from "../types/product.types";

/** Adds a Regal catalog product to the vendor's shop (guided add flow). */
export const useAddVendorProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddVendorProductPayload) =>
      productsMockApi.addFromCatalog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      notify.success("محصول به فروشگاه شما افزوده شد.");
    },
    onError: () => notify.error("افزودن محصول ناموفق بود."),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: ProductFormValues) => productsMockApi.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      notify.success("محصول با موفقیت ایجاد شد.");
    },
    onError: () => notify.error("ایجاد محصول ناموفق بود."),
  });
};

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: ProductFormValues) => productsMockApi.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      notify.success("تغییرات محصول ذخیره شد.");
    },
    onError: () => notify.error("ذخیره تغییرات ناموفق بود."),
  });
};

export const useSetProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ProductStatus }) =>
      productsMockApi.setStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      notify.success("وضعیت محصول به‌روزرسانی شد.");
    },
    onError: () => notify.error("تغییر وضعیت ناموفق بود."),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsMockApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      notify.success("محصول حذف شد.");
    },
    onError: () => notify.error("حذف محصول ناموفق بود."),
  });
};
