import type { FC } from "react";
import { Icon } from "@/shared/ui";
import { formatNumber, formatPrice } from "@/shared/utils/format";
import { getTotalStock } from "../constants/productMeta";
import type { Product } from "../types/product.types";
import ProductStatusBadge from "./ProductStatusBadge";
import styles from "./ProductsList.module.css";

interface ProductsListProps {
  products: Product[];
  onEdit: (id: string) => void;
  onToggleStatus: (product: Product) => void;
  onDelete: (product: Product) => void;
}

type StockTone = "ok" | "low" | "out";

const getStockTone = (stock: number): StockTone => {
  if (stock <= 0) return "out";
  if (stock < 5) return "low";
  return "ok";
};

const getDiscountPercent = (product: Product): number | null => {
  if (!product.discountPrice || product.discountPrice >= product.price)
    return null;
  return Math.round(
    ((product.price - product.discountPrice) / product.price) * 100,
  );
};

const Thumb: FC<{ product: Product }> = ({ product }) => {
  const percent = getDiscountPercent(product);
  return (
    <div className={styles.thumb}>
      {product.images[0] ? (
        <img src={product.images[0]} alt="" className={styles.thumbImg} />
      ) : (
        <Icon name="image" size={20} />
      )}
      {percent !== null && (
        <span className={styles.discountTag}>
          {percent.toLocaleString("fa-IR")}٪−
        </span>
      )}
    </div>
  );
};

const PriceCell: FC<{ product: Product }> = ({ product }) => (
  <div className={styles.priceCell}>
    {product.discountPrice ? (
      <>
        <span className={styles.priceNow}>
          {formatPrice(product.discountPrice)}
        </span>
        <span className={styles.priceOld}>{formatPrice(product.price)}</span>
      </>
    ) : (
      <span className={styles.priceNow}>{formatPrice(product.price)}</span>
    )}
  </div>
);

const StockCell: FC<{ product: Product; withLabel?: boolean }> = ({
  product,
  withLabel = false,
}) => {
  const stock = getTotalStock(product);
  const tone = getStockTone(stock);
  const text = tone === "out" ? "ناموجود" : `${formatNumber(stock)} عدد`;
  return (
    <span className={styles.stock} data-tone={tone}>
      {tone === "low" && <Icon name="alert-triangle" size={14} />}
      {withLabel && tone !== "out" ? `موجودی: ${text}` : text}
    </span>
  );
};

/** Compact icon actions used in the desktop table. */
const RowActions: FC<{
  product: Product;
  onEdit: (id: string) => void;
  onToggleStatus: (product: Product) => void;
  onDelete: (product: Product) => void;
}> = ({ product, onEdit, onToggleStatus, onDelete }) => {
  const toggleLabel =
    product.status === "inactive" ? "فعال‌سازی" : "غیرفعال‌سازی";
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.actionBtn}
        onClick={() => onEdit(product.id)}
        title="ویرایش"
        aria-label={`ویرایش ${product.title}`}
      >
        <Icon name="edit" size={17} />
      </button>
      <button
        type="button"
        className={styles.actionBtn}
        onClick={() => onToggleStatus(product)}
        title={toggleLabel}
        aria-label={`${toggleLabel} ${product.title}`}
      >
        <Icon name="power" size={17} />
      </button>
      <button
        type="button"
        className={`${styles.actionBtn} ${styles.danger}`}
        onClick={() => onDelete(product)}
        title="حذف"
        aria-label={`حذف ${product.title}`}
      >
        <Icon name="trash" size={17} />
      </button>
    </div>
  );
};

/** Larger, labelled actions used in the mobile cards for better tap UX. */
const MobileActions: FC<{
  product: Product;
  onEdit: (id: string) => void;
  onToggleStatus: (product: Product) => void;
  onDelete: (product: Product) => void;
}> = ({ product, onEdit, onToggleStatus, onDelete }) => {
  const toggleLabel =
    product.status === "inactive" ? "فعال‌سازی" : "غیرفعال‌سازی";
  return (
    <div className={styles.mobileActions}>
      <button
        type="button"
        className={styles.mobileBtn}
        onClick={() => onEdit(product.id)}
      >
        <Icon name="edit" size={18} />
        <span>ویرایش</span>
      </button>
      <button
        type="button"
        className={styles.mobileBtn}
        onClick={() => onToggleStatus(product)}
        aria-label={`${toggleLabel} ${product.title}`}
      >
        <Icon name="power" size={18} />
        <span>{toggleLabel}</span>
      </button>
      <button
        type="button"
        className={`${styles.mobileBtn} ${styles.danger}`}
        onClick={() => onDelete(product)}
        aria-label={`حذف ${product.title}`}
      >
        <Icon name="trash" size={18} />
        <span>حذف</span>
      </button>
    </div>
  );
};

const ProductsList: FC<ProductsListProps> = ({
  products,
  onEdit,
  onToggleStatus,
  onDelete,
}) => (
  <>
    {/* Desktop / tablet table */}
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>فهرست محصولات فروشگاه</caption>
        <thead>
          <tr>
            <th scope="col">محصول</th>
            <th scope="col">برند</th>
            <th scope="col">دسته‌بندی</th>
            <th scope="col">قیمت</th>
            <th scope="col">موجودی</th>
            <th scope="col">وضعیت</th>
            <th scope="col" className={styles.actionsHead}>
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.productCell}>
                  <Thumb product={product} />
                  <button
                    type="button"
                    className={styles.productTitleBtn}
                    onClick={() => onEdit(product.id)}
                  >
                    {product.title}
                  </button>
                </div>
              </td>
              <td>{product.brandName}</td>
              <td>{product.categoryName}</td>
              <td>
                <PriceCell product={product} />
              </td>
              <td>
                <StockCell product={product} />
              </td>
              <td>
                <ProductStatusBadge status={product.status} />
              </td>
              <td>
                <RowActions
                  product={product}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile cards */}
    <ul className={styles.cards}>
      {products.map((product) => (
        <li key={product.id} className={styles.card}>
          <div className={styles.cardTop}>
            <Thumb product={product} />
            <div className={styles.cardInfo}>
              <button
                type="button"
                className={styles.productTitleBtn}
                onClick={() => onEdit(product.id)}
              >
                {product.title}
              </button>
              <span className={styles.cardMeta}>
                {product.brandName} • {product.categoryName}
              </span>
              <div className={styles.cardBadges}>
                <ProductStatusBadge status={product.status} />
                <StockCell product={product} withLabel />
              </div>
            </div>
          </div>

          <div className={styles.cardPrice}>
            <span className={styles.cardPriceLabel}>قیمت فروش</span>
            <PriceCell product={product} />
          </div>

          <MobileActions
            product={product}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  </>
);

export default ProductsList;
