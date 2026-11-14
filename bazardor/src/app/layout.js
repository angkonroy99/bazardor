import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getAllCategories, getAllProducts } from "@/lib/api";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ বাজার দর জানুন এক নজরে।",
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <html lang="bn" data-theme="light" className="scroll-smooth">
      <body
        className={`${hindSiliguri.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}
      >
        <Toaster position="top-center" />
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
