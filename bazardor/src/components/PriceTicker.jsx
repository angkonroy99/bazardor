"use client";

import Link from "next/link";
import { toBanglaNumber, calculatePriceChange } from "@/lib/utils";

export default function PriceTicker({ products = [] }) {
  if (!products.length) return null;

  // ইনফিনিট স্ক্রলিংয়ের জন্য তালিকাটি দুবার নেওয়া হয়েছে
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-gray-900 text-white border-b border-gray-800 overflow-hidden py-2">
      <div className="animate-marquee flex items-center gap-6">
        {tickerItems.map((item, idx) => {
          const change = calculatePriceChange(item.today, item.yesterday);
          const badgeColor =
            change.status === "up"
              ? "text-emerald-400"
              : change.status === "down"
              ? "text-rose-400"
              : "text-gray-400";

          return (
            <Link
              key={`${item.id}-${idx}`}
              href={`/product/${item.slug || item.id}`}
              className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap hover:text-emerald-300 transition"
            >
              <span>{item.image}</span>
              <span className="font-medium text-gray-100">{item.nameBn}</span>
              <span className="text-amber-300 font-semibold">
                {toBanglaNumber(item.today)} টাকা/{item.unit?.replace("প্রতি ", "") || "একক"}
              </span>
              <span className={`font-semibold ${badgeColor}`}>{change.text}</span>
              <span className="text-gray-600 ml-2">|</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
