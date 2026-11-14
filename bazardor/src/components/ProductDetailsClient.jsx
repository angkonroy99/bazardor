"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toBanglaNumber, calculatePriceChange } from "@/lib/utils";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailsClient({ product }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন।", {
        id: "auth-redirect-toast",
      });
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="skeleton h-6 w-36 rounded-lg"></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="skeleton w-16 h-16 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="skeleton h-7 w-1/3"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="skeleton h-24 rounded-xl"></div>
            <div className="skeleton h-24 rounded-xl"></div>
            <div className="skeleton h-24 rounded-xl"></div>
          </div>
          <div className="skeleton h-64 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const todayPrice = Number(product.today) || 0;
  const yesterdayPrice = Number(product.yesterday) || todayPrice;
  const lastWeekPrice = Number(product.lastWeek) || todayPrice;
  const lastMonthPrice = Number(product.lastMonth) || todayPrice;

  const bazarRows =
    Array.isArray(product.markets) && product.markets.length > 0
      ? product.markets
      : [
          {
            name: "কারওয়ান বাজার",
            today: Math.max(1, todayPrice - 2),
            yesterday: Math.max(1, yesterdayPrice - 2),
            lastWeek: Math.max(1, lastWeekPrice - 2),
            lastMonth: Math.max(1, lastMonthPrice - 2),
          },
          {
            name: "নিউ মার্কেট কাঁচাবাজার",
            today: todayPrice,
            yesterday: yesterdayPrice,
            lastWeek: lastWeekPrice,
            lastMonth: lastMonthPrice,
          },
          {
            name: "মিরপুর-১ বাজার",
            today: todayPrice + 1,
            yesterday: yesterdayPrice + 1,
            lastWeek: lastWeekPrice + 1,
            lastMonth: lastMonthPrice + 1,
          },
          {
            name: "উত্তরা আজমপুর বাজার",
            today: todayPrice + 2,
            yesterday: yesterdayPrice + 2,
            lastWeek: lastWeekPrice + 2,
            lastMonth: lastMonthPrice + 2,
          },
          {
            name: "যাত্রাবাড়ী আড়ত",
            today: Math.max(1, todayPrice - 3),
            yesterday: Math.max(1, yesterdayPrice - 3),
            lastWeek: Math.max(1, lastWeekPrice - 3),
            lastMonth: Math.max(1, lastMonthPrice - 3),
          },
          {
            name: "মোহাম্মদপুর কৃষি মার্কেট",
            today: todayPrice,
            yesterday: yesterdayPrice,
            lastWeek: lastWeekPrice,
            lastMonth: lastMonthPrice,
          },
        ];

  const rowTodayPrices = bazarRows.map((r) => Number(r.today) || todayPrice);
  const minPrice = Math.min(...rowTodayPrices);
  const maxPrice = Math.max(...rowTodayPrices);
  const avgPrice = Math.round(
    rowTodayPrices.reduce((a, b) => a + b, 0) / rowTodayPrices.length
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              {product.image || "🛒"}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {product.description ||
                  `ঢাকার প্রধান খুচরা ও পাইকারি বাজারে আজকের ${product.nameBn}-এর দর তালিকা`}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {product.categoryNameBn && (
                  <Link
                    href={`/category/${product.category}`}
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    {product.categoryIcon} {product.categoryNameBn}
                  </Link>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {product.unit || "প্রতি কেজি"}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:text-right bg-emerald-50/60 sm:bg-transparent p-3.5 sm:p-0 rounded-xl">
            <p className="text-xs text-gray-500">গড় খুচরা দাম</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {toBanglaNumber(todayPrice)} টাকা
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 border border-gray-200/80 p-4">
            <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">
              {toBanglaNumber(minPrice)} টাকা
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-200/80 p-4">
            <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
              {toBanglaNumber(avgPrice)} টাকা
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-200/80 p-4">
            <p className="text-xs text-gray-500 font-medium">সর্বোচ্চ দাম</p>
            <p className="text-xl sm:text-2xl font-extrabold text-rose-600 mt-1">
              {toBanglaNumber(maxPrice)} টাকা
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            সকল দাম {product.unit || "প্রতি কেজি"} হিসেবে দেখানো হয়েছে
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs">
              <tr>
                <th>বাজারের নাম</th>
                <th>আজকের দাম</th>
                <th>গতকাল</th>
                <th>গত সপ্তাহ</th>
                <th>গত মাস</th>
                <th className="text-right">পরিবর্তন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bazarRows.map((row, idx) => {
                const rowToday = Number(row.today) || todayPrice;
                const rowYesterday = Number(row.yesterday) || yesterdayPrice;
                const rowChange = calculatePriceChange(rowToday, rowYesterday);

                return (
                  <tr key={idx} className="hover:bg-gray-50/80">
                    <td className="font-semibold text-gray-800">
                      {row.name || row.market}
                    </td>
                    <td className="font-bold text-gray-900">
                      {toBanglaNumber(rowToday)} টাকা
                    </td>
                    <td className="text-gray-600">
                      {toBanglaNumber(rowYesterday)} টাকা
                    </td>
                    <td className="text-gray-600">
                      {toBanglaNumber(row.lastWeek || lastWeekPrice)} টাকা
                    </td>
                    <td className="text-gray-600">
                      {toBanglaNumber(row.lastMonth || lastMonthPrice)} টাকা
                    </td>
                    <td className="text-right">
                      <span
                        className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          rowChange.status === "up"
                            ? "bg-emerald-50 text-emerald-600"
                            : rowChange.status === "down"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rowChange.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
