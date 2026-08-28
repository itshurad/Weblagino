import React from "react";
import { cookies } from "next/headers";
import queryString from "query-string";
import { Search } from "lucide-react";

import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPostsApi } from "@/services/postServices";
import Pagination from "@/ui/Pagination";
import PostList from "../_components/PostList";

// متادیتا برای سئو
export const metadata = {
  title: "مقالات و جستجو",
  description: "لیست کامل مقالات و جستجو در بین مطالب وبلاگ",
};

export default async function BlogsPage({ searchParams }) {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const queries = queryString.stringify(searchParams);
  const { posts, totalPages } = await getPostsApi(queries, options);
  const { search } = searchParams;

  return (
    <div className="w-full">
      {/* بخش نمایش وضعیت جستجو */}
      {search && (
        <header className="mb-10 flex items-center gap-4 rounded-3xl bg-orange-50 p-5 shadow-sm ring-1 ring-orange-100 md:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-orange-900/60 md:text-sm">
              نتایج جستجو برای:
            </p>
            <h1 className="text-lg font-black text-orange-900 md:text-xl">
              &quot;{search}&quot;
            </h1>
            <p className="mt-1 text-xs font-bold text-orange-700/60">
              {posts.length === 0
                ? "متأسفانه پستی یافت نشد."
                : `${posts.length} مورد پیدا شد.`}
            </p>
          </div>
        </header>
      )}

      {/* لیست مقالات */}
      <section aria-label="لیست مقالات">
        <PostList posts={posts} />

        {/* صفحه‌بندی (Pagination) */}
        {totalPages > 1 && (
          <nav
            aria-label="صفحات"
            className="mt-12 flex items-center justify-center pb-8 md:mt-16 md:pb-8"
          >
            <Pagination totalPages={totalPages} />
          </nav>
        )}
      </section>
    </div>
  );
}
