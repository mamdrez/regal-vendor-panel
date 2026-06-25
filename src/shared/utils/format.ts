/** Formats a number with Persian digits and thousands separators. */
export const formatNumber = (value: number): string =>
  value.toLocaleString("fa-IR");

/** Formats a price in Toman with Persian digits. */
export const formatPrice = (value: number): string =>
  `${value.toLocaleString("fa-IR")} تومان`;

/** Formats an ISO date string as a Persian (Jalali) date. */
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
