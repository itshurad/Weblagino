import React from "react";
import { cookies } from "next/headers";
import queryString from "query-string";

import { getPostsApi } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import PostList from "../../../_components/PostList";

// داینامیک کردن تایتل سئو بر اساس دسته‌بندی
export async function generateMetadata({ params }) {
  // در صورت نیاز می‌توانید اسم دسته را از API بگیرید و اینجا قرار دهید
  return {
    title: `دسته‌بندی: ${params.categorySlug}`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { categorySlug } = params;
  const cookieStore = cookies();

  const queries = `${queryString.stringify(searchParams)}&categorySlug=${categorySlug}`;
  const options = setCookieOnReq(cookieStore);

  const { posts } = await getPostsApi(queries, options);

  return (
    <section aria-label={`مقالات دسته ${categorySlug}`}>
      <PostList posts={posts} />
    </section>
  );
}
