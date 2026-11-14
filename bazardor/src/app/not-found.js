import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto my-16 sm:my-24 px-4 text-center">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-2xs space-y-5">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 text-rose-600 text-3xl font-extrabold border border-rose-100">
          ৪০৪
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          দুঃখিত, আপনি যে লিংকটি খুঁজছেন তা সঠিক নয় অথবা সরিয়ে ফেলা হয়েছে।
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="btn btn-sm sm:btn-md bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-7 gap-2"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
