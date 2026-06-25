import type { FC } from "react";
import { PlaceholderView } from "@/shared/ui";

const InventoryPage: FC = () => (
  <PlaceholderView
    title="موجودی"
    description="موجودی و انبار محصولات خود را در این بخش کنترل کنید."
    emptyTitle="اطلاعات موجودی در دسترس نیست"
    emptyDescription="با افزودن محصولات، می‌توانید موجودی هر کالا را اینجا مدیریت کنید."
  />
);

export default InventoryPage;
