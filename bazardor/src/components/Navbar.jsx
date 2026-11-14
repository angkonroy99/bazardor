"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { User, LogOut } from "lucide-react";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const banglaDate = getBanglaDate();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      {/* উপরের সারি: লোগো + তারিখ এবং ডানপাশে অথ বাটন */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* বাম পাশ: লোগো ও বাংলা তারিখ */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center overflow-hidden">
            <img
              src="/images/logo-icon.png"
              alt="বাজার দর"
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-emerald-700 group-hover:text-emerald-800 transition">
              <span>🛒 বাজার দর</span>
            </div>
            <p className="text-xs text-gray-500">{banglaDate}</p>
          </div>
        </Link>

        {/* ডান পাশ: Auth বাটন অথবা User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-lg"></div>
          ) : session?.user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/profile"
                className="btn btn-sm sm:btn-md btn-ghost border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 gap-2"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[100px] sm:max-w-[140px] truncate">
                  {session.user.name || "প্রোফাইল"}
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-sm sm:btn-md btn-outline btn-error gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">সাইন আউট</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-sm sm:btn-md btn-outline border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm sm:btn-md bg-emerald-600 hover:bg-emerald-700 text-white border-none"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* দ্বিতীয় সারি: ক্যাটাগরি নেভিগেশন লিংক */}
      <nav className="bg-emerald-50/70 border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              pathname === "/"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-800"
            }`}
          >
            🏠 সব পণ্য
          </Link>

          {categories.map((cat) => {
            const href = `/category/${cat.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={cat.id || cat.slug}
                href={href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-800"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
