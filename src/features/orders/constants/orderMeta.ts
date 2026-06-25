import type { BadgeTone } from "@/shared/ui";
import type { OrderStatus } from "../types/order.types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "در انتظار تایید",
  confirmed: "تایید شده",
  processing: "در حال آماده‌سازی",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
  returned: "مرجوع شده",
};

export const ORDER_STATUS_TONES: Record<OrderStatus, BadgeTone> = {
  pending: "warning",
  confirmed: "primary",
  processing: "primary",
  shipped: "primary",
  delivered: "success",
  cancelled: "danger",
  returned: "danger",
};

export const ORDER_STATUS_ORDER: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

/** Linear fulfilment flow used to render the order timeline. */
export const ORDER_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export interface OrderStatusAction {
  label: string;
  status: OrderStatus;
  variant: "primary" | "outline";
}

/** Context-aware next actions a vendor can take from a given status. */
export const getOrderStatusActions = (
  status: OrderStatus,
): OrderStatusAction[] => {
  switch (status) {
    case "pending":
      return [
        { label: "تایید سفارش", status: "confirmed", variant: "primary" },
        { label: "لغو سفارش", status: "cancelled", variant: "outline" },
      ];
    case "confirmed":
      return [
        { label: "آماده‌سازی", status: "processing", variant: "primary" },
        { label: "لغو سفارش", status: "cancelled", variant: "outline" },
      ];
    case "processing":
      return [
        { label: "ارسال شد", status: "shipped", variant: "primary" },
        { label: "لغو سفارش", status: "cancelled", variant: "outline" },
      ];
    case "shipped":
      return [
        { label: "تحویل داده شد", status: "delivered", variant: "primary" },
      ];
    case "delivered":
      return [{ label: "ثبت مرجوعی", status: "returned", variant: "outline" }];
    default:
      return [];
  }
};
