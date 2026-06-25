/**
 * Soft, premium chart palette and shared Recharts presentation tokens.
 * Colors are intentionally light and calm — no dark or heavily saturated tones.
 */
export const chartColors = {
  blue: "#8fb4ef",
  purple: "#b3a4e6",
  green: "#8ed6b3",
  pink: "#f2a9c0",
  champagne: "#e3c79e",
  gray: "#cfcbc3",
} as const;

/** Slightly stronger stroke variants for line/area outlines. */
export const chartStrokes = {
  blue: "#6f97da",
  purple: "#9a87d6",
  green: "#6cc79c",
  pink: "#e487a3",
  champagne: "#d2af7c",
} as const;

/** Soft burgundy wash to echo the brand on a few key charts. */
export const brandSoft = "#c98aa1";
export const brandSoftStroke = "#a85f78";

/** Categorical sequence used when a chart needs many distinct slices/bars. */
export const categoricalPalette: string[] = [
  chartColors.blue,
  chartColors.purple,
  chartColors.green,
  chartColors.pink,
  chartColors.champagne,
  chartColors.gray,
];

/** Subtle, calm presentation tokens shared across charts. */
export const chartTokens = {
  grid: "#eceae5",
  axis: "#a6a098",
  tickFontSize: 12,
  fontFamily: "regular",
  barRadius: [8, 8, 8, 8] as [number, number, number, number],
  barRadiusTop: [8, 8, 0, 0] as [number, number, number, number],
} as const;

/** Persian digits with thousands separators for axis ticks and tooltips. */
export const faNumber = (value: number): string => value.toLocaleString("fa-IR");

/** Compact Persian number for crowded axes (e.g. ۱۲ هزار / ۱.۵ میلیون). */
export const faCompact = (value: number): string => {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString("fa-IR", {
      maximumFractionDigits: 1,
    })} میلیون`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toLocaleString("fa-IR", {
      maximumFractionDigits: 1,
    })} هزار`;
  }
  return value.toLocaleString("fa-IR");
};

/**
 * Very short Persian value for narrow YAxis ticks — no currency word so the
 * label never overflows the axis (e.g. ۳۵م / ۱۲هـ). Tooltips show the full price.
 */
export const faAxisPrice = (value: number): string => {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString("fa-IR", {
      maximumFractionDigits: 1,
    })}م`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toLocaleString("fa-IR", {
      maximumFractionDigits: 0,
    })}هـ`;
  }
  return value.toLocaleString("fa-IR");
};

/** Short Persian number for narrow numeric YAxis ticks. */
export const faAxisNumber = (value: number): string => {
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toLocaleString("fa-IR", {
      maximumFractionDigits: 1,
    })}هـ`;
  }
  return value.toLocaleString("fa-IR");
};

/** Full Persian Toman value. */
export const faPrice = (value: number): string =>
  `${value.toLocaleString("fa-IR")} تومان`;
