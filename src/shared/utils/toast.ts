import { toast } from "react-toastify";

/** Thin wrapper so feature code has one consistent feedback API. */
export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
};
