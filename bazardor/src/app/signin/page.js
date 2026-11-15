"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
            সাইন ইন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
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
              placeholder="পাসওয়ার্ড দিন"
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
              "লগ ইন করুন"
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
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-emerald-600 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
