import { toast, type ToastOptions } from "react-toastify";
import ToastMessage from "@/shared/ui/Toast/ToastMessage";

/** Disable the default toastify icon — the icon lives in our content. */
const baseOptions: ToastOptions = { icon: false };

/** Thin wrapper so feature code has one consistent, branded feedback API. */
export const notify = {
  success: (message: string) =>
    toast.success(
      <ToastMessage variant="success" message={message} />,
      baseOptions,
    ),
  error: (message: string) =>
    toast.error(
      <ToastMessage variant="error" message={message} />,
      baseOptions,
    ),
  info: (message: string) =>
    toast.info(<ToastMessage variant="info" message={message} />, baseOptions),
};
