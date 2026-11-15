import { notFound } from "next/navigation";
import { getProductBySlugOrId } from "@/lib/api";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlugOrId(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
