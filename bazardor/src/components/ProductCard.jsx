import Link from "next/link";
import { toBanglaNumber, calculatePriceChange } from "@/lib/utils";

export default function ProductCard({ product }) {
  const change = calculatePriceChange(product.today, product.yesterday);

  const badgeStyle =
    change.status === "up"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
      : change.status === "down"
      ? "bg-rose-50 text-rose-600 border-rose-200"
      : "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group bg-white rounded-2xl border border-gray-200/90 p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
    >
      {/* উপরের অংশ: বামে ইমোজি, ডানে পণ্যের নাম ও একক */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
          {product.image || "🛒"}
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {product.unit || "প্রতি কেজি"}
          </p>
        </div>
      </div>

      {/* নিচের অংশ: বামে আজকের দাম, ডানে পরিবর্তনের ব্যাজ */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-0.5">আজকের দাম</p>
          <p className="text-lg sm:text-xl font-extrabold text-gray-900">
            {toBanglaNumber(product.today)}{" "}
            <span className="text-sm font-semibold text-gray-700">টাকা</span>
          </p>
        </div>

        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badgeStyle}`}
        >
          {change.text}
        </span>
      </div>
    </Link>
  );
}
