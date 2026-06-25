import type { FC } from "react";
import { PlaceholderView } from "@/shared/ui";

const OrdersPage: FC = () => (
  <PlaceholderView
    title="سفارش‌ها"
    description="سفارش‌های دریافتی فروشگاه خود را پیگیری و مدیریت کنید."
    emptyTitle="هنوز سفارشی ثبت نشده است"
    emptyDescription="پس از انتشار محصولات و خرید مشتریان، سفارش‌ها در این بخش نمایش داده می‌شوند."
  />
);

export default OrdersPage;
