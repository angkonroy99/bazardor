import ProductSkeleton from "@/components/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton w-11 h-11 rounded-full"></div>
          <div className="space-y-2">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-3.5 w-20"></div>
          </div>
        </div>
        <div className="skeleton h-10 w-40 rounded-xl"></div>
      </div>
      <ProductSkeleton count={6} />
    </div>
  );
}
