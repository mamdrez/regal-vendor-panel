/**
 * Generic envelope shared by mock services. Keeping a consistent response
 * shape makes it easy to swap mock implementations for real API calls later.
 */
export interface ApiResponse<TData> {
  data: TData;
  message: string;
  success: boolean;
}
