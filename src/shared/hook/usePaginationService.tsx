// types
// hooks
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchService } from "@/config/fetchServices";

export interface ProductState {
  data: any[];
  page: number;
  totalPage?: number;
  currentPage?: number;
  scrollPosition?: number;
}

const initialState: ProductState = {
  data: [],
  page: 1,
  scrollPosition: 0,
};

export const usePaginationService = (
  keyCache: string,
  route: string,
  params: Record<string, unknown> = {},
) => {
  const queryClient = useQueryClient();
  const { inView, ref } = useInView();
  const hasAdvancedInViewRef = useRef(false);

  const { data: caseState } = useQuery<any>({
    queryKey: keyCache,
    queryFn: () =>
      queryClient.getQueryData<ProductState>(keyCache) ?? initialState,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const state = caseState ?? initialState;

  const patchState = (
    patch:
      | Partial<ProductState>
      | ((prev: ProductState) => Partial<ProductState>),
  ) => {
    queryClient.setQueryData<ProductState>(keyCache, (prev) => {
      const base = (prev as ProductState) ?? initialState;
      const next = typeof patch === "function" ? patch(base) : patch;
      return { ...base, ...next };
    });
  };

  const setPage = (page: number) => patchState({ page });
  const handleScrollPosition = (pos?: number) => {
    patchState({ scrollPosition: pos });
  };

  const clearScrollPosition = () => {
    patchState({ scrollPosition: undefined });
  };

  const mergeUniqueById = (prev: any[], incoming: any[]) => {
    const map = new Map(prev.map((p) => [p.id, p]));
    for (const it of incoming) map.set(it.id, it);
    return Array.from(map.values());
  };

  const handleUpdateData = (incoming: any[], replace = false) => {
    if (!incoming?.length) return;
    patchState((prev) => ({
      data: replace ? incoming : mergeUniqueById(prev.data, incoming),
    }));
  };

  const handleResetCache = () => {
    queryClient.removeQueries({ queryKey: keyCache });
    queryClient.setQueryData(keyCache, initialState);
    setPage(1);
  };

  // products data

  const { data, isLoading, isFetching, isSuccess } = useQuery(
    ["caseState", keyCache, state.page, params],
    () => fetchService("GET", route, { params: { page: state.page, ...params } }),
  );

  useEffect(() => {
    if (data && isSuccess) {
      handleUpdateData(data?.data, false);
      patchState({
        totalPage: data.lastPage,
        currentPage: data.page,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!inView) {
      hasAdvancedInViewRef.current = false;
      return;
    }

    const canAutoAdvance =
      !hasAdvancedInViewRef.current &&
      !isFetching &&
      state.page < (state?.totalPage as number);

    if (canAutoAdvance) {
      hasAdvancedInViewRef.current = true;
      setPage(state.page + 1);
    }
  }, [inView, isFetching, state.page, state?.totalPage]);

  return {
    caseState: state,
    isLoading: isLoading,
    isFetching,
    ref,
    inView,
    handleResetCache,
    scrollPosition: state?.scrollPosition,
    handleScrollPosition,
    clearScrollPosition,
  };
};
