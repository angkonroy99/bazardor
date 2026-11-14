import { getAllProducts } from "@/lib/api";
import { calculatePriceChange, toBanglaNumber } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getAllProducts();

  const productsWithChange = products.map((product) => ({
    ...product,
    changeInfo: calculatePriceChange(product.today, product.yesterday),
  }));

  // Section A: আজ দাম বেড়েছে (Top 6 risers)
  const topRisers = productsWithChange
    .filter((p) => p.changeInfo.percent > 0)
    .sort((a, b) => b.changeInfo.percent - a.changeInfo.percent)
    .slice(0, 6);

  // Section B: আজ দাম কমেছে (Top 6 fallers)
  const topFallers = productsWithChange
    .filter((p) => p.changeInfo.percent < 0)
    .sort((a, b) => a.changeInfo.percent - b.changeInfo.percent)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-12 sm:space-y-14">
      {/* 🅱️ Hero / Banner সেকশন (Penpot ডিজাইন অনুযায়ী) */}
      <section className="bg-gradient-to-r from-emerald-50/90 via-green-50/60 to-emerald-50/40 border border-emerald-100 rounded-3xl p-6 sm:p-10 lg:px-14 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* বাম পাশ */}
          <div className="space-y-4 text-center md:text-left">
            <span className="inline-block text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
              দৈনিক বাজার দর তালিকা
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, সবজি, মাছ ও মাংসের প্রতিদিনের
              হালনাগাদ খুচরা বাজার দর জানুন সহজেই।
            </p>

            <div className="pt-2 flex justify-center md:justify-start">
              <a
                href="#সব-পণ্য"
                className="btn btn-sm sm:btn-md bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-7 font-semibold shadow-xs"
              >
                পণ্য দেখুন ↓
              </a>
            </div>
          </div>

          {/* ডান পাশ: হিরো ইমেজ */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/bazar-hero.png"
              alt="আজকের বাজারের দাম"
              className="w-64 sm:w-80 md:w-96 h-auto object-contain drop-shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Section A: আজ দাম বেড়েছে ▲ */}
      {topRisers.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-emerald-600 text-base">▲</span>
              <span>আজ দাম বেড়েছে</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: আজ দাম কমেছে ▼ */}
      {topFallers.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-rose-600 text-base">▼</span>
              <span>আজ দাম কমেছে</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topFallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C: সব পণ্য (#সব-পণ্য অ্যাঙ্কর আইডিসহ) */}
      <section id="সব-পণ্য" className="scroll-mt-32 space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            মোট {toBanglaNumber(products.length)}টি নিত্যপ্রয়োজনীয় পণ্যের আজকের
            বাজার দর
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
