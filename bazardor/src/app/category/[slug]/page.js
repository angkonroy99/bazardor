import { getAllCategories, getProductsByCategory } from "@/lib/api";
import CategoryProductsClient from "@/components/CategoryProductsClient";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getAllCategories(),
    getProductsByCategory(slug),
  ]);

  const currentCategory =
    categories.find((c) => c.slug === slug) ||
    (products.length > 0
      ? {
          slug,
          nameBn: products[0].categoryNameBn || slug,
          icon: products[0].categoryIcon || "📦",
        }
      : null);

  return (
    <CategoryProductsClient category={currentCategory} products={products} />
  );
}
