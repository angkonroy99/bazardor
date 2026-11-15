"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("তথ্য আপডেট করতে অনুগ্রহ করে সাইন ইন করুন।", {
        id: "update-auth-toast",
      });
      router.replace("/signin");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নতুন নাম লিখুন।");
      return;
    }

    setUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
      } else {
        toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="max-w-md mx-auto my-14 px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
          <div className="skeleton h-7 w-44 mx-auto"></div>
          <div className="skeleton h-12 w-full rounded-xl"></div>
          <div className="skeleton h-11 w-full rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 sm:my-16 px-4 space-y-4">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>প্রোফাইলে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              নতুন নাম (Name)
            </label>
            <input
              type="text"
              placeholder="আপনার নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="btn w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-bold"
          >
            {updating ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "তথ্য আপডেট করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
