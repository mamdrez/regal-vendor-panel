import { delay } from "@/shared/utils/delay";
import type {
  Product,
  ProductFilters,
  ProductFormValues,
  ProductStatus,
} from "../types/product.types";

const STORAGE_KEY = "regal_vendor_products";

const createId = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const now = (): string => new Date().toISOString();

const seedProducts = (): Product[] => [
  {
    id: "prod-1",
    title: "مانتو کتان جلو باز",
    brandName: "Zara",
    categoryName: "لباس زنانه",
    description: "مانتو کتان با برش امروزی، مناسب فصل بهار.",
    images: [],
    price: 2_450_000,
    discountPrice: 1_980_000,
    status: "active",
    soldCount: 142,
    variants: [
      { id: "v1", color: "مشکی", size: "M", sku: "ZR-MN-M-BK", stock: 12 },
      { id: "v2", color: "کرم", size: "L", sku: "ZR-MN-L-CR", stock: 5 },
    ],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-2",
    title: "کفش رانینگ مردانه",
    brandName: "Nike",
    categoryName: "کفش",
    description: "کفش ورزشی سبک با زیره فوم.",
    images: [],
    price: 4_200_000,
    status: "active",
    soldCount: 98,
    variants: [
      { id: "v3", color: "سفید", size: "42", sku: "NK-RN-42-WT", stock: 3 },
      { id: "v4", color: "سفید", size: "43", sku: "NK-RN-43-WT", stock: 0 },
    ],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-3",
    title: "کیف دستی چرم",
    brandName: "Mango",
    categoryName: "کیف",
    description: "کیف دستی چرم طبیعی با بند بلند.",
    images: [],
    price: 3_100_000,
    discountPrice: 2_650_000,
    status: "active",
    soldCount: 64,
    variants: [
      { id: "v5", color: "قهوه‌ای", size: "Free", sku: "MG-BG-FR-BR", stock: 18 },
    ],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-4",
    title: "تی‌شرت اورسایز",
    brandName: "H&M",
    categoryName: "لباس مردانه",
    description: "تی‌شرت نخی اورسایز با چاپ مینیمال.",
    images: [],
    price: 850_000,
    status: "out_of_stock",
    soldCount: 30,
    variants: [
      { id: "v6", color: "طوسی", size: "L", sku: "HM-TS-L-GY", stock: 0 },
    ],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-5",
    title: "دستبند نقره",
    brandName: "Dior",
    categoryName: "زیورآلات",
    description: "دستبند نقره با طراحی ظریف.",
    images: [],
    price: 1_750_000,
    status: "draft",
    soldCount: 0,
    variants: [
      { id: "v7", color: "نقره‌ای", size: "Free", sku: "DR-BR-FR-SL", stock: 7 },
    ],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-6",
    title: "عطر زنانه لوکس",
    brandName: "Gucci",
    categoryName: "عطر و زیبایی",
    description: "رایحه گلی-چوبی ماندگار.",
    images: [],
    price: 5_900_000,
    status: "inactive",
    soldCount: 21,
    variants: [
      { id: "v8", color: "—", size: "90ml", sku: "GC-PF-90", stock: 2 },
    ],
    createdAt: now(),
    updatedAt: now(),
  },
];

const read = (): Product[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedProducts();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
};

const write = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const matches = (product: Product, filters?: ProductFilters): boolean => {
  if (!filters) return true;
  const search = filters.search.trim().toLowerCase();
  const bySearch =
    !search ||
    product.title.toLowerCase().includes(search) ||
    product.brandName.toLowerCase().includes(search);
  const byStatus =
    filters.status === "all" || product.status === filters.status;
  const byCategory =
    filters.category === "all" || product.categoryName === filters.category;
  return bySearch && byStatus && byCategory;
};

export const productsMockApi = {
  async list(filters?: ProductFilters): Promise<Product[]> {
    await delay(500);
    return read()
      .filter((product) => matches(product, filters))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },

  /** Unfiltered snapshot, used to derive dashboard stats. */
  async listAll(): Promise<Product[]> {
    await delay(350);
    return read();
  },

  async getById(id: string): Promise<Product> {
    await delay(400);
    const product = read().find((item) => item.id === id);
    if (!product) throw new Error("محصول مورد نظر یافت نشد.");
    return product;
  },

  async create(values: ProductFormValues): Promise<Product> {
    await delay(700);
    const product: Product = {
      ...values,
      id: createId("prod"),
      soldCount: 0,
      createdAt: now(),
      updatedAt: now(),
    };
    write([product, ...read()]);
    return product;
  },

  async update(id: string, values: ProductFormValues): Promise<Product> {
    await delay(700);
    const products = read();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("محصول مورد نظر یافت نشد.");
    const updated: Product = {
      ...products[index],
      ...values,
      id,
      updatedAt: now(),
    };
    products[index] = updated;
    write(products);
    return updated;
  },

  async setStatus(id: string, status: ProductStatus): Promise<Product> {
    await delay(400);
    const products = read();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("محصول مورد نظر یافت نشد.");
    products[index] = { ...products[index], status, updatedAt: now() };
    write(products);
    return products[index];
  },

  async remove(id: string): Promise<void> {
    await delay(500);
    write(read().filter((item) => item.id !== id));
  },
};
