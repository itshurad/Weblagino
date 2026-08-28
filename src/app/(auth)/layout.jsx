import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#F9FAFB] font-sans selection:bg-[#E05D4B]/20 selection:text-[#022626]">
      {/* نویگیشن مینیمال بالای صفحه */}
      <nav className="absolute top-0 flex w-full items-center justify-between p-6 md:px-12 md:py-10">
        {/* لوگومارک هندسی و مینیمال */}
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#022626] text-white transition-transform hover:scale-105 active:scale-95"
        >
          <span className="text-xl font-black tracking-tighter">h</span>
        </Link>

        {/* دکمه بازگشت */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-bold text-[#022626] transition-colors hover:text-[#E05D4B]"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          بازگشت
        </Link>
      </nav>

      {/* کانتینر اصلی فرم */}
      <main className="w-full max-w-[420px] px-5">
        {/* باکس خفن اما مینیمال: سایه بسیار نرم، گوشه‌های گرد، حاشیه ظریف */}
        <div className="w-full rounded-[28px] bg-white p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] ring-1 ring-slate-900/5 sm:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
