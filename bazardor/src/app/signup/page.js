"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email || !password) {
      toast.error("সবগুলো ঘর সঠিকভাবে পূরণ করুন।");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
      } else {
        await authClient.signOut();
        toast.success("রেজিস্ট্রেশন সফল হয়েছে! এখন সাইন ইন করুন।");
        router.push("/signin");
      }
    } catch {
      toast.error("রেজিস্ট্রেশন করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider} দিয়ে লগইন করতে সমস্যা হয়েছে।`);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 sm:my-16 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            বাজার দর প্ল্যাটফর্মে নতুন অ্যাকাউন্ট খুলুন
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">নাম</label>
            <input
              type="text"
              placeholder="আপনার পূর্ণ নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-600"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">ইমেইল</label>
            <input
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-600"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-bold text-base"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        <div className="divider text-xs text-gray-400">অথবা</div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="btn btn-outline border-gray-300 hover:bg-gray-100 hover:text-gray-900 rounded-xl text-sm font-semibold"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="btn btn-outline border-gray-300 hover:bg-gray-100 hover:text-gray-900 rounded-xl text-sm font-semibold"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-bold text-emerald-600 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
