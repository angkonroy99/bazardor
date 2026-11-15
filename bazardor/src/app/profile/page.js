"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Edit3, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।", {
        id: "profile-auth-toast",
      });
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে লগ আউট হয়েছে!");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("লগ আউট করতে সমস্যা হয়েছে।");
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="max-w-xl mx-auto my-14 px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
          <div className="skeleton h-8 w-40 mx-auto"></div>
          <div className="flex items-center gap-4">
            <div className="skeleton w-16 h-16 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="skeleton h-5 w-1/2"></div>
              <div className="skeleton h-4 w-2/3"></div>
            </div>
          </div>
          <div className="skeleton h-11 w-full rounded-xl"></div>
        </div>
      </div>
    );
  }

  const user = session.user;
  const initials = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="max-w-xl mx-auto my-12 sm:my-16 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
          আমার প্রোফাইল
        </h1>

        <div className="rounded-2xl bg-gray-50 border border-gray-200/80 p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-14 h-14 rounded-full object-cover border border-emerald-200"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="btn btn-sm bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>নাম পরিবর্তন</span>
          </Link>
        </div>

        <button
          onClick={handleSignOut}
          className="btn w-full bg-rose-600 hover:bg-rose-700 text-white border-none rounded-xl font-bold gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>লগ আউট</span>
        </button>
      </div>
    </div>
  );
}
