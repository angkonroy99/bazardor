import ProductSkeleton from "@/components/ProductSkeleton";

export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* হিরো স্কেলিটন */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="skeleton h-5 w-36 rounded-full"></div>
          <div className="skeleton h-10 w-3/4"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-2/3"></div>
          <div className="skeleton h-11 w-40 rounded-xl mt-2"></div>
        </div>
        <div className="skeleton h-60 w-full rounded-2xl"></div>
      </div>

      {/* প্রোডাক্ট গ্রিড স্কেলিটন */}
      <div className="space-y-4">
        <div className="skeleton h-7 w-48"></div>
        <ProductSkeleton count={6} />
      </div>
    </div>
  );
}
