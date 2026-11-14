"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { toEnglishNumber, toBanglaNumber } from "@/lib/utils";
import { ChevronDown, ArrowLeft } from "lucide-react";

export default function CategoryProductsClient({ category, products = [] }) {
  const [sortOrder, setSortOrder] = useState("default");

  // চ্যালেঞ্জ C1: বাংলা সংখ্যা সঠিকভাবে নিউমেরিক ভ্যালু দিয়ে সর্ট করা
  const sortedProducts = useMemo(() => {
    const items = [...products];
    if (sortOrder === "low-to-high") {
      return items.sort(
        (a, b) => toEnglishNumber(a.today) - toEnglishNumber(b.today)
      );
    }
    if (sortOrder === "high-to-low") {
      return items.sort(
        (a, b) => toEnglishNumber(b.today) - toEnglishNumber(a.today)
      );
    }
    return items;
  }, [products, sortOrder]);

  if (!category || products.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-16 px-4 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-2xs space-y-4">
          <div className="text-5xl">🔍</div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500">
            দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই অথবা লিংকটি সঠিক নয়।
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="btn btn-sm sm:btn-md bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-6">
      {/* ক্যাটাগরি হেডার ও Sort Dropdown (Penpot ডিজাইন অনুযায়ী) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl">
            {category.icon || "📦"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              মোট {toBanglaNumber(products.length)}টি পণ্য
            </p>
          </div>
        </div>

        {/* Sort Control (Challenge C1) */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">সাজান:</span>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-800 text-sm rounded-xl pl-3.5 pr-9 py-2 font-medium focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* ৩ কলামের প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
