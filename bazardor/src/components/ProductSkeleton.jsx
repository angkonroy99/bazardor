export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="skeleton w-12 h-12 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="skeleton h-5 w-2/3"></div>
              <div className="skeleton h-3.5 w-1/3"></div>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="skeleton h-7 w-24"></div>
            <div className="skeleton h-6 w-16 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
