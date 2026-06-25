import {
  Product1,
  Product2,
  Product3,
  Product4,
  Product5,
  Product6,
  Product7,
  Product8,
  Product9,
  Product10,
  Product11,
  Product12,
  Product13,
  Product14,
  Product15,
} from "@/assets/images/product";

/** Ordered pool of mock product images used across the products feature. */
export const PRODUCT_IMAGES: string[] = [
  Product1,
  Product2,
  Product3,
  Product4,
  Product5,
  Product6,
  Product7,
  Product8,
  Product9,
  Product10,
  Product11,
  Product12,
  Product13,
  Product14,
  Product15,
];

/** Stable hash so the same key always maps to the same image. */
const hashKey = (key: string): number => {
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }
  return hash;
};

/**
 * Deterministically picks a product image from the pool for a given key
 * (usually a product/catalog id). Same key → same image, but different
 * products get a varied, "random-looking" spread.
 */
export const getProductImage = (key: string): string =>
  PRODUCT_IMAGES[hashKey(key) % PRODUCT_IMAGES.length];

/** Picks `count` distinct-ish images for a key (primary + extras). */
export const getProductImages = (key: string, count = 2): string[] => {
  const start = hashKey(key) % PRODUCT_IMAGES.length;
  return Array.from(
    { length: Math.min(count, PRODUCT_IMAGES.length) },
    (_, offset) => PRODUCT_IMAGES[(start + offset * 6) % PRODUCT_IMAGES.length],
  );
};
