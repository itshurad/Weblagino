import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import queryString from "query-string";

// Components
import Pagination from "@/ui/Pagination";
import SortFilter from "@/ui/SortFilter";

// Services & Utils
import { getPostsApi } from "@/services/postServices";
import { getCategoriesApi } from "@/services/categoryServie";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { toLocalDateShort } from "@/utils/dateFormatter";

// Icons (Clean Code: Replacing raw SVGs with Lucide React)
import {
  Monitor,
  Gamepad2,
  Palette,
  Landmark,
  ChefHat,
  Plane,
  Dumbbell,
  Home,
  Shirt,
  Sparkles,
} from "lucide-react";

// =========================================================
// SEO Metadata
// =========================================================
export async function generateMetadata({ searchParams }) {
  return {
    title: "وبلاگ | مقالات و تازه‌ها",
    description:
      "جدیدترین مقالات، آموزش‌ها و اخبار در حوزه‌های تکنولوژی، سبک زندگی، هنر و...",
    alternates: {
      canonical: "/blogs",
    },
  };
}

// =========================================================
// Configuration Data
// =========================================================
const categoryItems = {
  technologie: {
    title: "تکنولوژی",
    icon: Monitor,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "games-and-entertainment": {
    title: "بازی و سرگرمی",
    icon: Gamepad2,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "art-and-books": {
    title: "هنر و ادبیات",
    icon: Palette,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "culture-and-history": {
    title: "فرهنگ و تاریخ",
    icon: Landmark,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "cooking-and-nutrition": {
    title: "آشپزی و تغذیه",
    icon: ChefHat,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "travel-and-tourism": {
    title: "سفر و گردشگری",
    icon: Plane,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  exercise: {
    title: "ورزش و سلامتی",
    icon: Dumbbell,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "home-and-decoration": {
    title: "خانه و دکوراسیون",
    icon: Home,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  "fashion-and-lifestyle": {
    title: "مد و سبک زندگی",
    icon: Shirt,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
};

// =========================================================
// Main Page Component
// =========================================================
export default async function BlogPage({ searchParams }) {
  // Fetching Data
  const queries = queryString.stringify(await searchParams);
  const cookieStore = await cookies();
  const options = setCookieOnReq(cookieStore);

  const [postsRes, lastPostsRes, categoriesRes] = await Promise.all([
    getPostsApi(queries, options),
    getPostsApi("", options), // Fetching without query for latest posts
    getCategoriesApi(),
  ]);

  const posts = postsRes?.posts || [];
  const totalPages = postsRes?.totalPages || 1;
  const lastPosts = lastPostsRes?.posts || [];
  const categories = categoriesRes?.categories || [];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:px-8 lg:px-12">
      {/* سئو: تگ H1 مخفی برای ربات‌های موتور جستجو */}
      <h1 className="sr-only">مقالات و تازه‌های وبلاگ</h1>

      {/* =========================================================
          LATEST POSTS (Mobile-First: Scrollable on mobile, Grid on Desktop)
      ========================================================= */}
      <section aria-labelledby="latest-posts" className="mb-12 md:mb-16">
        <header className="mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-orange-500" />
          <h2
            id="latest-posts"
            className="text-xl font-black text-slate-900 md:text-2xl"
          >
            پست‌های برگزیده
          </h2>
        </header>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:h-[480px] md:grid-cols-3 md:grid-rows-2 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {lastPosts.slice(0, 4).map((blog, index) => {
            // ایجاد گرید اختصاصی دسکتاپ
            let gridClass =
              "w-[280px] shrink-0 snap-center md:w-auto md:shrink";
            if (index === 0)
              gridClass += " md:col-start-1 md:row-span-2 md:row-start-1";
            if (index === 1) gridClass += " md:col-start-2 md:row-start-1";
            if (index === 2) gridClass += " md:col-start-2 md:row-start-2";
            if (index === 3)
              gridClass += " md:col-start-3 md:row-span-2 md:row-start-1";

            return (
              <article
                key={blog._id}
                className={`group relative overflow-hidden rounded-[24px] bg-slate-100 transition-all duration-500 hover:shadow-xl md:rounded-[32px] ${gridClass}`}
              >
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity duration-300 group-hover:from-orange-950/90" />

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="absolute inset-0 flex flex-col justify-end p-5 md:p-6"
                >
                  <h3 className="line-clamp-2 text-lg font-black leading-tight text-white transition-colors group-hover:text-orange-400 md:text-xl">
                    {blog.title}
                  </h3>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          CATEGORIES (Mobile-First: Scrollable Pills)
      ========================================================= */}
      <section aria-label="دسته‌بندی‌ها" className="mb-12 md:mb-16">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] md:flex-wrap md:justify-center md:gap-4 [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const catConfig = categoryItems[category.slug] || {
              icon: Sparkles,
              color: "text-orange-600",
              bg: "bg-orange-50",
            };
            const Icon = catConfig.icon;

            return (
              <li key={category._id} className="shrink-0 snap-center">
                <Link
                  href={`/blogs/category/${category.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 pr-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md md:rounded-[24px] md:p-3 md:pr-4"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-[14px] transition-transform duration-300 group-hover:rotate-12 md:h-12 md:w-12 md:rounded-[18px] ${catConfig.bg} ${catConfig.color}`}
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                  <span className="pl-3 text-sm font-bold text-slate-700 transition-colors group-hover:text-orange-600 md:text-base">
                    {category.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* =========================================================
          DIVIDER & DESKTOP FILTER
      ========================================================= */}
      <div className="mb-8 hidden items-center gap-6 md:flex">
        <div className="h-px flex-1 bg-gradient-to-l from-orange-200 to-transparent" />
        <h2 className="text-2xl font-black text-slate-800">آخرین مقالات</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
      </div>

      <div className="mb-8 hidden md:block">
        <SortFilter />
      </div>

      {/* =========================================================
          BLOG POSTS GRID
      ========================================================= */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts.map((blog) => {
          const catConfig = categoryItems[blog.category?.slug];

          return (
            <article
              key={blog._id}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100 md:rounded-[32px]"
            >
              <div className="relative h-[220px] w-full overflow-hidden sm:h-[240px]">
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/10 transition-opacity group-hover:opacity-0" />

                {/* Category Badge on Image */}
                {blog.category?.title && (
                  <div className="absolute right-4 top-4 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-black text-orange-600 shadow-sm backdrop-blur-md">
                    {blog.category.title}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <Link href={`/blogs/${blog.slug}`} className="mb-4 flex-1">
                  <h3 className="line-clamp-2 text-lg font-black leading-relaxed text-slate-800 transition-colors group-hover:text-orange-600">
                    {blog.title}
                  </h3>
                </Link>

                <footer className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-400">
                    {toLocalDateShort(blog.createdAt)}
                  </span>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-sm font-black text-orange-500 transition-colors hover:text-orange-700"
                  >
                    مطالعه مقاله &larr;
                  </Link>
                </footer>
              </div>
            </article>
          );
        })}
      </section>

      {/* =========================================================
          PAGINATION
      ========================================================= */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-12 flex justify-center pb-8">
          <Pagination totalPages={totalPages} />
        </nav>
      )}

      {/* =========================================================
          MOBILE STICKY FILTER
      ========================================================= */}
      <div className="fixed bottom-6 left-0 right-0 z-30 px-4 md:hidden">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-white/80 p-2 shadow-2xl shadow-orange-900/10 ring-1 ring-slate-200 backdrop-blur-xl">
          <SortFilter />
        </div>
      </div>
    </main>
  );
}
