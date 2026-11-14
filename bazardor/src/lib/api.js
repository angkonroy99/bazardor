const API_URLS = [
  "https://programming-hero.com",
  "https://workers.dev",
  "https://workers.dev",
];

// মূল API কাজ না করলে ব্যাকআপ API থেকে ডাটা আনার ফাংশন
async function fetchWithFallback(endpoint) {
  for (const baseUrl of API_URLS) {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) continue;
      const json = await res.json();
      if (json && (json.data || Array.isArray(json))) {
        return json.data !== undefined ? json.data : json;
      }
    } catch (error) {
      console.warn(`Failed fetching from ${baseUrl}${endpoint}:`, error.message);
    }
  }
  return null;
}

// সব পণ্য আনার ফাংশন
export async function getAllProducts() {
  const data = await fetchWithFallback("/products");
  return Array.isArray(data) ? data : [];
}

// নির্দিষ্ট একটি পণ্য slug বা id দিয়ে আনার ফাংশন
export async function getProductBySlugOrId(slugOrId) {
  const direct = await fetchWithFallback(`/products/${slugOrId}`);
  if (direct && !Array.isArray(direct) && direct.id) {
    return direct;
  }
  const all = await getAllProducts();
  return (
    all.find((p) => p.slug === slugOrId || String(p.id) === String(slugOrId)) ||
    null
  );
}

// সব ক্যাটাগরি আনার ফাংশন
export async function getAllCategories() {
  const data = await fetchWithFallback("/categories");
  return Array.isArray(data) ? data : [];
}

// নির্দিষ্ট ক্যাটাগরির পণ্য আনার ফাংশন
export async function getProductsByCategory(slug) {
  const data = await fetchWithFallback(`/products?category=${slug}`);
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  const all = await getAllProducts();
  return all.filter((p) => p.category === slug);
}
