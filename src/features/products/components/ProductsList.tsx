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

const Thumb: FC<{ product: Product }> = ({ product }) => (
  <div className={styles.thumb}>
    {product.images[0] ? (
      <img src={product.images[0]} alt="" className={styles.thumbImg} />
    ) : (
      <Icon name="image" size={20} />
    )}
  </div>
);

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

const RowActions: FC<{
  product: Product;
  onEdit: (id: string) => void;
  onToggleStatus: (product: Product) => void;
  onDelete: (product: Product) => void;
}> = ({ product, onEdit, onToggleStatus, onDelete }) => (
  <div className={styles.actions}>
    <button
      type="button"
      className={styles.actionBtn}
      onClick={() => onEdit(product.id)}
      title="ویرایش"
      aria-label="ویرایش"
    >
      <Icon name="edit" size={17} />
    </button>
    <button
      type="button"
      className={styles.actionBtn}
      onClick={() => onToggleStatus(product)}
      title={product.status === "inactive" ? "فعال‌سازی" : "غیرفعال‌سازی"}
      aria-label="تغییر وضعیت"
    >
      <Icon name="power" size={17} />
    </button>
    <button
      type="button"
      className={`${styles.actionBtn} ${styles.danger}`}
      onClick={() => onDelete(product)}
      title="حذف"
      aria-label="حذف"
    >
      <Icon name="trash" size={17} />
    </button>
  </div>
);

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
        <thead>
          <tr>
            <th>محصول</th>
            <th>برند</th>
            <th>دسته‌بندی</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>وضعیت</th>
            <th className={styles.actionsHead}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.productCell}>
                  <Thumb product={product} />
                  <span className={styles.productTitle}>{product.title}</span>
                </div>
              </td>
              <td>{product.brandName}</td>
              <td>{product.categoryName}</td>
              <td>
                <PriceCell product={product} />
              </td>
              <td>
                <span className={styles.stock}>
                  {formatNumber(getTotalStock(product))} عدد
                </span>
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
    <div className={styles.cards}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.cardTop}>
            <Thumb product={product} />
            <div className={styles.cardInfo}>
              <span className={styles.productTitle}>{product.title}</span>
              <span className={styles.cardMeta}>
                {product.brandName} • {product.categoryName}
              </span>
              <PriceCell product={product} />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.cardBottomInfo}>
              <ProductStatusBadge status={product.status} />
              <span className={styles.stock}>
                موجودی: {formatNumber(getTotalStock(product))}
              </span>
            </div>
            <RowActions
              product={product}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          </div>
        </div>
      ))}
    </div>
  </>
);

export default ProductsList;
