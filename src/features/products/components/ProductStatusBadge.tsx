import type { FC } from "react";
import { Badge } from "@/shared/ui";
import {
  PRODUCT_STATUS_LABELS,
  PRODUCT_STATUS_TONES,
} from "../constants/productMeta";
import type { ProductStatus } from "../types/product.types";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const ProductStatusBadge: FC<ProductStatusBadgeProps> = ({ status }) => (
  <Badge tone={PRODUCT_STATUS_TONES[status]}>
    {PRODUCT_STATUS_LABELS[status]}
  </Badge>
);

export default ProductStatusBadge;
