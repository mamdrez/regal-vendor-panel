import { delay } from "@/shared/utils/delay";
import type {
  Brand,
  BrandCatalogItem,
  CatalogQuery,
} from "../types/product.types";

/**
 * Mock Regal global catalog. Vendors (sellers) browse these brand products
 * and add them to their own shop with seller-specific selling data. This is
 * intentionally read-only catalog data — it is not the vendor's product list.
 */

const BRAND_CATALOG: Brand[] = [
  {
    id: "zara",
    name: "Zara",
    logo: "",
    categoryName: "لباس زنانه",
    description: "مد روز اسپانیایی با کالکشن‌های فصلی متنوع.",
    itemCount: 5,
  },
  {
    id: "nike",
    name: "Nike",
    logo: "",
    categoryName: "ورزشی",
    description: "پوشاک و کفش ورزشی حرفه‌ای.",
    itemCount: 4,
  },
  {
    id: "adidas",
    name: "Adidas",
    logo: "",
    categoryName: "ورزشی",
    description: "اسنیکر و لباس ورزشی با طراحی آلمانی.",
    itemCount: 3,
  },
  {
    id: "mango",
    name: "Mango",
    logo: "",
    categoryName: "لباس زنانه",
    description: "استایل مدیترانه‌ای، شیک و کاربردی.",
    itemCount: 3,
  },
  {
    id: "hm",
    name: "H&M",
    logo: "",
    categoryName: "لباس مردانه",
    description: "مد در دسترس برای استفاده روزمره.",
    itemCount: 4,
  },
  {
    id: "dior",
    name: "Dior",
    logo: "",
    categoryName: "زیورآلات",
    description: "برند لاکچری فرانسوی با اکسسوری‌های نفیس.",
    itemCount: 3,
  },
  {
    id: "gucci",
    name: "Gucci",
    logo: "",
    categoryName: "عطر و زیبایی",
    description: "لوکس ایتالیایی؛ عطر، کیف و اکسسوری.",
    itemCount: 3,
  },
  {
    id: "prada",
    name: "Prada",
    logo: "",
    categoryName: "کیف",
    description: "کیف و اکسسوری چرم با دوام بالا.",
    itemCount: 2,
  },
  {
    id: "balenciaga",
    name: "Balenciaga",
    logo: "",
    categoryName: "کفش",
    description: "اسنیکر و استایل استریت لاکچری.",
    itemCount: 2,
  },
];

const item = (
  partial: Omit<BrandCatalogItem, "images"> & { images?: string[] },
): BrandCatalogItem => ({ images: [], ...partial });

const CATALOG_ITEMS: BrandCatalogItem[] = [
  // Zara
  item({
    id: "cat-zara-1",
    brandId: "zara",
    brandName: "Zara",
    title: "مانتو کتان جلو باز",
    categoryName: "لباس زنانه",
    description: "مانتو کتان با برش امروزی، مناسب فصل بهار.",
    availableColors: ["مشکی", "کرم", "زیتونی"],
    availableSizes: ["S", "M", "L", "XL"],
    source: "catalog",
  }),
  item({
    id: "cat-zara-2",
    brandId: "zara",
    brandName: "Zara",
    title: "بلوز ساتن یقه‌گرد",
    categoryName: "لباس زنانه",
    description: "بلوز ساتن با درخشش ملایم برای استایل مجلسی.",
    availableColors: ["شیری", "یاسی"],
    availableSizes: ["S", "M", "L"],
    source: "catalog",
  }),
  item({
    id: "cat-zara-3",
    brandId: "zara",
    brandName: "Zara",
    title: "شلوار پارچه‌ای دمپا",
    categoryName: "لباس زنانه",
    description: "شلوار دمپا با فیت بلند و پارچه خوش‌افت.",
    availableColors: ["مشکی", "طوسی"],
    availableSizes: ["36", "38", "40", "42"],
    source: "catalog",
  }),
  item({
    id: "cat-zara-4",
    brandId: "zara",
    brandName: "Zara",
    title: "ست کت و شلوار زنانه",
    categoryName: "لباس زنانه",
    description: "ست رسمی با دوخت تمیز، انتخاب مجله مد فصل.",
    availableColors: ["سرمه‌ای", "بژ"],
    availableSizes: ["S", "M", "L"],
    source: "journal",
  }),
  item({
    id: "cat-zara-5",
    brandId: "zara",
    brandName: "Zara",
    title: "پیراهن میدی پلیسه",
    categoryName: "لباس زنانه",
    description: "پیراهن پلیسه بلند، منتخب ژورنال بهار.",
    availableColors: ["صورتی", "سبز"],
    availableSizes: ["S", "M", "L"],
    source: "journal",
  }),

  // Nike
  item({
    id: "cat-nike-1",
    brandId: "nike",
    brandName: "Nike",
    title: "کفش رانینگ مردانه Air Zoom",
    categoryName: "کفش",
    description: "کفش ورزشی سبک با زیره فوم واکنش‌گرا.",
    availableColors: ["سفید", "مشکی"],
    availableSizes: ["41", "42", "43", "44"],
    source: "catalog",
  }),
  item({
    id: "cat-nike-2",
    brandId: "nike",
    brandName: "Nike",
    title: "تیشرت ورزشی Dri-FIT",
    categoryName: "ورزشی",
    description: "تیشرت خنک با فناوری جذب رطوبت.",
    availableColors: ["مشکی", "آبی", "قرمز"],
    availableSizes: ["S", "M", "L", "XL"],
    source: "catalog",
  }),
  item({
    id: "cat-nike-3",
    brandId: "nike",
    brandName: "Nike",
    title: "هودی فلیس مردانه",
    categoryName: "لباس مردانه",
    description: "هودی گرم با جنس فلیس نرم.",
    availableColors: ["طوسی", "مشکی"],
    availableSizes: ["M", "L", "XL"],
    source: "catalog",
  }),
  item({
    id: "cat-nike-4",
    brandId: "nike",
    brandName: "Nike",
    title: "کوله ورزشی Brasilia",
    categoryName: "اکسسوری",
    description: "کوله بادوام با فضای زیاد برای باشگاه.",
    availableColors: ["مشکی"],
    availableSizes: ["Free"],
    source: "catalog",
  }),

  // Adidas
  item({
    id: "cat-adidas-1",
    brandId: "adidas",
    brandName: "Adidas",
    title: "اسنیکر Ultraboost",
    categoryName: "کفش",
    description: "کفش دویدن با کفی Boost و راحتی بالا.",
    availableColors: ["مشکی", "سفید"],
    availableSizes: ["40", "41", "42", "43"],
    source: "catalog",
  }),
  item({
    id: "cat-adidas-2",
    brandId: "adidas",
    brandName: "Adidas",
    title: "گرمکن سه خط",
    categoryName: "ورزشی",
    description: "گرمکن کلاسیک با خطوط مشخصه برند.",
    availableColors: ["مشکی", "سرمه‌ای"],
    availableSizes: ["S", "M", "L"],
    source: "catalog",
  }),
  item({
    id: "cat-adidas-3",
    brandId: "adidas",
    brandName: "Adidas",
    title: "شورت ورزشی مردانه",
    categoryName: "ورزشی",
    description: "شورت سبک مناسب تمرین و دویدن.",
    availableColors: ["مشکی", "طوسی"],
    availableSizes: ["M", "L", "XL"],
    source: "journal",
  }),

  // Mango
  item({
    id: "cat-mango-1",
    brandId: "mango",
    brandName: "Mango",
    title: "پالتو بلند کلاسیک",
    categoryName: "لباس زنانه",
    description: "پالتو بلند با جنس پشمی و فرم ایستاده.",
    availableColors: ["کاراملی", "مشکی"],
    availableSizes: ["S", "M", "L"],
    source: "catalog",
  }),
  item({
    id: "cat-mango-2",
    brandId: "mango",
    brandName: "Mango",
    title: "کیف دستی چرم",
    categoryName: "کیف",
    description: "کیف دستی چرم طبیعی با بند بلند.",
    availableColors: ["قهوه‌ای", "مشکی"],
    availableSizes: ["Free"],
    source: "catalog",
  }),
  item({
    id: "cat-mango-3",
    brandId: "mango",
    brandName: "Mango",
    title: "ژاکت بافت یقه‌اسکی",
    categoryName: "لباس زنانه",
    description: "بافت نرم و گرم برای روزهای سرد.",
    availableColors: ["شیری", "زرشکی"],
    availableSizes: ["S", "M", "L"],
    source: "catalog",
  }),

  // H&M
  item({
    id: "cat-hm-1",
    brandId: "hm",
    brandName: "H&M",
    title: "تیشرت اورسایز",
    categoryName: "لباس مردانه",
    description: "تیشرت نخی اورسایز با چاپ مینیمال.",
    availableColors: ["طوسی", "سفید", "مشکی"],
    availableSizes: ["M", "L", "XL"],
    source: "catalog",
  }),
  item({
    id: "cat-hm-2",
    brandId: "hm",
    brandName: "H&M",
    title: "پیراهن جین",
    categoryName: "لباس مردانه",
    description: "پیراهن جین با دوخت محکم و جیب سینه.",
    availableColors: ["آبی روشن", "آبی تیره"],
    availableSizes: ["S", "M", "L", "XL"],
    source: "catalog",
  }),
  item({
    id: "cat-hm-3",
    brandId: "hm",
    brandName: "H&M",
    title: "شلوار چینو",
    categoryName: "لباس مردانه",
    description: "شلوار چینو راحت برای استفاده روزمره.",
    availableColors: ["بژ", "سرمه‌ای"],
    availableSizes: ["30", "32", "34", "36"],
    source: "catalog",
  }),
  item({
    id: "cat-hm-4",
    brandId: "hm",
    brandName: "H&M",
    title: "سویشرت کلاه‌دار",
    categoryName: "لباس مردانه",
    description: "سویشرت ساده و راحت با کلاه.",
    availableColors: ["مشکی", "طوسی"],
    availableSizes: ["M", "L", "XL"],
    source: "journal",
  }),

  // Dior
  item({
    id: "cat-dior-1",
    brandId: "dior",
    brandName: "Dior",
    title: "دستبند نقره ظریف",
    categoryName: "زیورآلات",
    description: "دستبند نقره با طراحی ظریف و مدرن.",
    availableColors: ["نقره‌ای"],
    availableSizes: ["Free"],
    source: "catalog",
  }),
  item({
    id: "cat-dior-2",
    brandId: "dior",
    brandName: "Dior",
    title: "گردنبند طلایی",
    categoryName: "زیورآلات",
    description: "گردنبند با آبکاری طلا و پلاک ظریف.",
    availableColors: ["طلایی"],
    availableSizes: ["Free"],
    source: "catalog",
  }),
  item({
    id: "cat-dior-3",
    brandId: "dior",
    brandName: "Dior",
    title: "عینک آفتابی زنانه",
    categoryName: "اکسسوری",
    description: "عینک آفتابی با فریم لوکس، منتخب ژورنال.",
    availableColors: ["مشکی", "قهوه‌ای"],
    availableSizes: ["Free"],
    source: "journal",
  }),

  // Gucci
  item({
    id: "cat-gucci-1",
    brandId: "gucci",
    brandName: "Gucci",
    title: "عطر زنانه لوکس",
    categoryName: "عطر و زیبایی",
    description: "رایحه گلی-چوبی ماندگار.",
    availableColors: ["—"],
    availableSizes: ["50ml", "90ml"],
    source: "catalog",
  }),
  item({
    id: "cat-gucci-2",
    brandId: "gucci",
    brandName: "Gucci",
    title: "کیف دوشی چرم",
    categoryName: "کیف",
    description: "کیف دوشی چرم با لوگوی برند.",
    availableColors: ["مشکی", "قرمز"],
    availableSizes: ["Free"],
    source: "catalog",
  }),
  item({
    id: "cat-gucci-3",
    brandId: "gucci",
    brandName: "Gucci",
    title: "شال ابریشمی",
    categoryName: "اکسسوری",
    description: "شال ابریشمی با طرح اختصاصی فصل.",
    availableColors: ["سبز", "کرم"],
    availableSizes: ["Free"],
    source: "journal",
  }),

  // Prada
  item({
    id: "cat-prada-1",
    brandId: "prada",
    brandName: "Prada",
    title: "کیف دستی نایلونی",
    categoryName: "کیف",
    description: "کیف دستی سبک و بادوام با فرم کلاسیک.",
    availableColors: ["مشکی"],
    availableSizes: ["Free"],
    source: "catalog",
  }),
  item({
    id: "cat-prada-2",
    brandId: "prada",
    brandName: "Prada",
    title: "کیف کمری چرم",
    categoryName: "کیف",
    description: "کیف کمری جمع‌وجور برای استایل روزمره.",
    availableColors: ["مشکی", "قهوه‌ای"],
    availableSizes: ["Free"],
    source: "catalog",
  }),

  // Balenciaga
  item({
    id: "cat-balenciaga-1",
    brandId: "balenciaga",
    brandName: "Balenciaga",
    title: "اسنیکر Triple S",
    categoryName: "کفش",
    description: "اسنیکر حجیم با استایل استریت.",
    availableColors: ["سفید", "مشکی"],
    availableSizes: ["40", "41", "42", "43", "44"],
    source: "catalog",
  }),
  item({
    id: "cat-balenciaga-2",
    brandId: "balenciaga",
    brandName: "Balenciaga",
    title: "اسلیپ‌آن Track",
    categoryName: "کفش",
    description: "کفش راحتی با طراحی مدرن، منتخب ژورنال.",
    availableColors: ["مشکی"],
    availableSizes: ["41", "42", "43"],
    source: "journal",
  }),
];

const includesText = (haystack: string, needle: string): boolean =>
  haystack.toLowerCase().includes(needle.toLowerCase());

export const brandCatalogMockApi = {
  /** All brands; optionally filtered by a free-text search. */
  async getBrands(search?: string): Promise<Brand[]> {
    await delay(450);
    const query = search?.trim() ?? "";
    if (!query) return [...BRAND_CATALOG];
    return BRAND_CATALOG.filter(
      (brand) =>
        includesText(brand.name, query) ||
        includesText(brand.categoryName, query) ||
        includesText(brand.description, query),
    );
  },

  async getBrandById(brandId: string): Promise<Brand | undefined> {
    await delay(200);
    return BRAND_CATALOG.find((brand) => brand.id === brandId);
  },

  /** Catalog products for a brand, filtered by search and category. */
  async getCatalogItems(query: CatalogQuery): Promise<BrandCatalogItem[]> {
    await delay(500);
    const search = query.search.trim();
    return CATALOG_ITEMS.filter((catalogItem) => {
      if (catalogItem.brandId !== query.brandId) return false;
      const bySearch =
        !search ||
        includesText(catalogItem.title, search) ||
        includesText(catalogItem.description ?? "", search);
      const byCategory =
        query.category === "all" || catalogItem.categoryName === query.category;
      return bySearch && byCategory;
    });
  },
};
