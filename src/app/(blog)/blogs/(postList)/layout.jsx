import React, { Suspense } from "react";
import { Mail, TrendingUp } from "lucide-react";
import CategoryList from "../_components/CategoryList";
import { TimeFilter } from "@/ui/TimeFilter";

export default function BlogLayout({ children }) {
  return (
    <div className="py-8 md:container md:mx-auto md:max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* --- بخش سایدبار --- */}
        <aside className="order-2 col-span-1 lg:order-1 lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            {/* فیلترها (دسته‌بندی و زمان) */}
            <section className="space-y-4" aria-label="فیلترهای نمایش">
              <h3 className="px-2 text-xs font-black uppercase tracking-widest text-slate-400">
                فیلترهای نمایش
              </h3>
              <Suspense
                fallback={
                  <div className="h-10 w-full animate-pulse rounded-xl bg-orange-50"></div>
                }
              >
                <CategoryList />
              </Suspense>
              <TimeFilter />
            </section>

            {/* بخش محبوب‌ترین‌ها */}
            <section
              className="hidden rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm md:block"
              aria-label="مطالب داغ"
            >
              <header className="mb-4 flex items-center gap-2 text-slate-800">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <h3 className="text-sm font-black">داغ‌ترین مطالب</h3>
              </header>
              <ul className="space-y-4">
                {/* نمونه تستی - در آینده می‌توانید دیتای واقعی مپ کنید */}
                <li className="group cursor-pointer border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <p className="line-clamp-2 text-xs font-bold leading-relaxed text-slate-600 transition-colors group-hover:text-orange-600">
                    چگونه با ری‌اکت اپلیکیشن‌های سریع‌تری بسازیم؟
                  </p>
                </li>
                <li className="group cursor-pointer">
                  <p className="line-clamp-2 text-xs font-bold leading-relaxed text-slate-600 transition-colors group-hover:text-orange-600">
                    آینده هوش مصنوعی در توسعه وب
                  </p>
                </li>
              </ul>
            </section>

            {/* بنر خبرنامه (CTA) */}
            <section className="relative hidden overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl shadow-orange-500/20 md:block">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 blur-lg"></div>

              <Mail className="mb-4 h-8 w-8 text-orange-100" />
              <h4 className="mb-2 text-lg font-black">خبرنامه وبلاگینو</h4>
              <p className="mb-6 text-xs leading-relaxed text-orange-50 opacity-90">
                جدیدترین مقالات و آموزش‌ها را در ایمیل خود دریافت کنید.
              </p>
              <button className="w-full rounded-xl bg-white py-3 text-xs font-black text-orange-600 transition-all hover:bg-orange-50 active:scale-95">
                عضویت رایگان
              </button>
            </section>
          </div>
        </aside>

        {/* --- محتوای اصلی --- */}
        <div className="order-1 col-span-1 lg:order-2 lg:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}
