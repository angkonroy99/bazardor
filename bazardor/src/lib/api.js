const API_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// API সাময়িকভাবে নেটওয়ার্ক ব্লক করলে ব্যাকআপ ডাটা (৩৩টি পণ্য ও ৮টি ক্যাটাগরি)
const FALLBACK_CATEGORIES = [
  { id: 1, slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: 2, slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: 3, slug: "tel", nameBn: "তেল", icon: "🫙" },
  { id: 4, slug: "sobji", nameBn: "সবজি", icon: "🥔" },
  { id: 5, slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: 6, slug: "mangsho", nameBn: "মাংস ও ডিম", icon: "🍗" },
  { id: 7, slug: "mosla", nameBn: "মসলা", icon: "🧅" },
  { id: 8, slug: "fol", nameBn: "ফল", icon: "🍌" },
];

const FALLBACK_PRODUCTS = [
  { id: 1, slug: "sorno-machi-chal", nameBn: "স্বর্ণমাছি চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", unit: "প্রতি কেজি", image: "🍚", today: 58, yesterday: 56, lastWeek: 55, lastMonth: 54 },
  { id: 2, slug: "miniket-chal", nameBn: "মিনিকেট চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", unit: "প্রতি কেজি", image: "🍚", today: 72, yesterday: 70, lastWeek: 69, lastMonth: 68 },
  { id: 3, slug: "najirshail-chal", nameBn: "নাজিরশাইল চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", unit: "প্রতি কেজি", image: "🍚", today: 80, yesterday: 82, lastWeek: 80, lastMonth: 78 },
  { id: 4, slug: "chinigura-chal", nameBn: "চিনিগুঁড়া চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", unit: "প্রতি কেজি", image: "🍚", today: 135, yesterday: 135, lastWeek: 130, lastMonth: 128 },
  { id: 5, slug: "moshur-dal-deshi", nameBn: "মসুর ডাল (দেশি)", category: "dal", categoryNameBn: "ডাল", categoryIcon: "🫘", unit: "প্রতি কেজি", image: "🫘", today: 135, yesterday: 132, lastWeek: 130, lastMonth: 128 },
  { id: 6, slug: "moshur-dal-mota", nameBn: "মসুর ডাল (মোটা)", category: "dal", categoryNameBn: "ডাল", categoryIcon: "🫘", unit: "প্রতি কেজি", image: "🫘", today: 105, yesterday: 108, lastWeek: 106, lastMonth: 105 },
  { id: 7, slug: "mug-dal", nameBn: "মুগ ডাল", category: "dal", categoryNameBn: "ডাল", categoryIcon: "🫘", unit: "প্রতি কেজি", image: "🫘", today: 165, yesterday: 160, lastWeek: 158, lastMonth: 155 },
  { id: 8, slug: "boot-dal", nameBn: "বুট ডাল", category: "dal", categoryNameBn: "ডাল", categoryIcon: "🫘", unit: "প্রতি কেজি", image: "🫘", today: 115, yesterday: 115, lastWeek: 112, lastMonth: 110 },
  { id: 9, slug: "soyabean-tel-botol", nameBn: "সয়াবিন তেল (বোতল)", category: "tel", categoryNameBn: "তেল", categoryIcon: "🫙", unit: "প্রতি লিটার", image: "🫙", today: 167, yesterday: 167, lastWeek: 165, lastMonth: 163 },
  { id: 10, slug: "soyabean-tel-khola", nameBn: "সয়াবিন তেল (খোলা)", category: "tel", categoryNameBn: "তেল", categoryIcon: "🫙", unit: "প্রতি লিটার", image: "🫙", today: 152, yesterday: 155, lastWeek: 154, lastMonth: 150 },
  { id: 11, slug: "sorishar-tel", nameBn: "সরিষার তেল", category: "tel", categoryNameBn: "তেল", categoryIcon: "🫙", unit: "প্রতি লিটার", image: "🫙", today: 240, yesterday: 235, lastWeek: 235, lastMonth: 230 },
  { id: 12, slug: "palm-oil", nameBn: "পাম অয়েল", category: "tel", categoryNameBn: "তেল", categoryIcon: "🫙", unit: "প্রতি লিটার", image: "🫙", today: 138, yesterday: 140, lastWeek: 139, lastMonth: 135 },
  { id: 13, slug: "alu", nameBn: "আলু", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥔", unit: "প্রতি কেজি", image: "🥔", today: 55, yesterday: 58, lastWeek: 60, lastMonth: 52 },
  { id: 14, slug: "begun", nameBn: "বেগুন", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥔", unit: "প্রতি কেজি", image: "🍆", today: 70, yesterday: 65, lastWeek: 62, lastMonth: 60 },
  { id: 15, slug: "tomato", nameBn: "টমেটো", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥔", unit: "প্রতি কেজি", image: "🍅", today: 90, yesterday: 95, lastWeek: 100, lastMonth: 85 },
  { id: 16, slug: "dherosh", nameBn: "ঢেঁড়স", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥔", unit: "প্রতি কেজি", image: "🥬", today: 60, yesterday: 64, lastWeek: 65, lastMonth: 58 },
  { id: 17, slug: "potol", nameBn: "পটল", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥔", unit: "প্রতি কেজি", image: "🥒", today: 50, yesterday: 50, lastWeek: 52, lastMonth: 48 },
  { id: 18, slug: "korola", nameBn: "করলা", category: "sobji", categoryNameBn: "সবজি", categoryIcon: "🥔", unit: "প্রতি কেজি", image: "🥬", today: 75, yesterday: 70, lastWeek: 68, lastMonth: 65 },
  { id: 19, slug: "ilish-mach", nameBn: "ইলিশ মাছ", category: "mach", categoryNameBn: "মাছ", categoryIcon: "🐟", unit: "প্রতি কেজি", image: "🐟", today: 1850, yesterday: 1800, lastWeek: 1750, lastMonth: 1700 },
  { id: 20, slug: "rui-mach", nameBn: "রুই মাছ", category: "mach", categoryNameBn: "মাছ", categoryIcon: "🐟", unit: "প্রতি কেজি", image: "🐟", today: 360, yesterday: 370, lastWeek: 365, lastMonth: 350 },
  { id: 21, slug: "katla-mach", nameBn: "কাতলা মাছ", category: "mach", categoryNameBn: "মাছ", categoryIcon: "🐟", unit: "প্রতি কেজি", image: "🐟", today: 380, yesterday: 380, lastWeek: 375, lastMonth: 370 },
  { id: 22, slug: "pangash-mach", nameBn: "পাঙ্গাস মাছ", category: "mach", categoryNameBn: "মাছ", categoryIcon: "🐟", unit: "প্রতি কেজি", image: "🐟", today: 210, yesterday: 220, lastWeek: 215, lastMonth: 205 },
  { id: 23, slug: "broiler-murgi", nameBn: "ব্রয়লার মুরগি", category: "mangsho", categoryNameBn: "মাংস ও ডিম", categoryIcon: "🍗", unit: "প্রতি কেজি", image: "🍗", today: 190, yesterday: 185, lastWeek: 180, lastMonth: 175 },
  { id: 24, slug: "sonali-murgi", nameBn: "সোনালী মুরগি", category: "mangsho", categoryNameBn: "মাংস ও ডিম", categoryIcon: "🍗", unit: "প্রতি কেজি", image: "🍗", today: 310, yesterday: 320, lastWeek: 315, lastMonth: 300 },
  { id: 25, slug: "gorur-mangsho", nameBn: "গরুর মাংস", category: "mangsho", categoryNameBn: "মাংস ও ডিম", categoryIcon: "🍗", unit: "প্রতি কেজি", image: "🥩", today: 780, yesterday: 780, lastWeek: 760, lastMonth: 750 },
  { id: 26, slug: "farm-dim", nameBn: "ফার্মের ডিম (লাল)", category: "mangsho", categoryNameBn: "মাংস ও ডিম", categoryIcon: "🍗", unit: "প্রতি ডজন", image: "🥚", today: 148, yesterday: 145, lastWeek: 144, lastMonth: 140 },
  { id: 27, slug: "peyaj-deshi", nameBn: "পেঁয়াজ (দেশি)", category: "mosla", categoryNameBn: "মসলা", categoryIcon: "🧅", unit: "প্রতি কেজি", image: "🧅", today: 110, yesterday: 105, lastWeek: 100, lastMonth: 95 },
  { id: 28, slug: "roshun-deshi", nameBn: "রসুন (দেশি)", category: "mosla", categoryNameBn: "মসলা", categoryIcon: "🧅", unit: "প্রতি কেজি", image: "🧄", today: 220, yesterday: 225, lastWeek: 220, lastMonth: 210 },
  { id: 29, slug: "ada", nameBn: "আদা", category: "mosla", categoryNameBn: "মসলা", categoryIcon: "🧅", unit: "প্রতি কেজি", image: "🫚", today: 240, yesterday: 230, lastWeek: 225, lastMonth: 220 },
  { id: 30, slug: "kacha-morich", nameBn: "কাঁচা মরিচ", category: "mosla", categoryNameBn: "মসলা", categoryIcon: "🧅", unit: "প্রতি কেজি", image: "🌶️", today: 160, yesterday: 170, lastWeek: 180, lastMonth: 150 },
  { id: 31, slug: "sagor-kola", nameBn: "সাগর কলা", category: "fol", categoryNameBn: "ফল", categoryIcon: "🍌", unit: "প্রতি ডজন", image: "🍌", today: 120, yesterday: 120, lastWeek: 115, lastMonth: 110 },
  { id: 32, slug: "apple", nameBn: "আপেল (ফুজি)", category: "fol", categoryNameBn: "ফল", categoryIcon: "🍌", unit: "প্রতি কেজি", image: "🍎", today: 320, yesterday: 310, lastWeek: 305, lastMonth: 300 },
  { id: 33, slug: "malta", nameBn: "মাল্টা", category: "fol", categoryNameBn: "ফল", categoryIcon: "🍌", unit: "প্রতি কেজি", image: "🍊", today: 280, yesterday: 290, lastWeek: 285, lastMonth: 270 },
];

function extractArray(json) {
  if (!json) return null;
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.products)) return json.products;
  if (Array.isArray(json.categories)) return json.categories;
  if (json.data && typeof json.data === "object") {
    for (const key of Object.keys(json.data)) {
      if (Array.isArray(json.data[key])) return json.data[key];
    }
  }
  for (const key of Object.keys(json)) {
    if (Array.isArray(json[key])) return json[key];
  }
  return null;
}

async function fetchWithFallback(endpoint) {
  for (const baseUrl of API_URLS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) continue;
      const json = await res.json();

      const arr = extractArray(json);
      if (arr && arr.length > 0) return arr;

      if (json?.data && typeof json.data === "object" && !Array.isArray(json.data)) {
        return json.data;
      }
      if (json && (json.id || json.slug)) {
        return json;
      }
    } catch {
      // পরের অফিসিয়াল API লিংক চেষ্টা করবে
    }
  }
  return null;
}

// Endpoint: /products
export async function getAllProducts() {
  const data = await fetchWithFallback("/products");
  return Array.isArray(data) && data.length > 0 ? data : FALLBACK_PRODUCTS;
}

// Endpoint: /products/1 বা ?slug=...
export async function getProductBySlugOrId(slugOrId) {
  const direct = await fetchWithFallback(`/products/${slugOrId}`);
  if (direct && !Array.isArray(direct) && (direct.id || direct.slug)) {
    return direct;
  }
  const byQuery = await fetchWithFallback(`/products?slug=${slugOrId}`);
  if (Array.isArray(byQuery) && byQuery.length > 0) {
    return byQuery[0];
  }
  const all = await getAllProducts();
  return (
    all.find((p) => p.slug === slugOrId || String(p.id) === String(slugOrId)) ||
    null
  );
}

// Endpoint: /categories
export async function getAllCategories() {
  const data = await fetchWithFallback("/categories");
  return Array.isArray(data) && data.length > 0 ? data : FALLBACK_CATEGORIES;
}

