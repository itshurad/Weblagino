"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  CalendarDays,
  Heart,
  Bookmark,
  ChevronLeft,
  User,
  FileSearch,
} from "lucide-react";

import truncateText from "@/utils/trancateText";
import { toLocalDateShort } from "@/utils/dateFormatter";
import useLike from "@/hooks/useLike";
import useBookmark from "@/hooks/useBookmark";

export default function PostList({ posts }) {
  const router = useRouter();
  const { likePost, isLiking } = useLike();
  const { bookmarkPost, isBookmarking } = useBookmark();

  // ======================= حالت خالی (Empty State) =======================
  if (!posts || posts.length === 0) {
    return (
      <div className="animate-in fade-in zoom-in flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-200 bg-slate-50/50 px-4 py-16 text-center duration-500 md:rounded-[40px] md:px-6 md:py-20">
        <div className="group relative mb-8">
          {/* هاله نارنجی رنگ متحرک */}
          <div className="absolute inset-0 scale-[1.8] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-orange-500/20 blur-[40px]"></div>
          <div className="relative flex h-24 w-24 animate-[bounce_5s_ease-in-out_infinite] items-center justify-center rounded-[32px] bg-gradient-to-tr from-white via-orange-50 to-white shadow-2xl shadow-orange-900/10 ring-1 ring-white/80 ring-offset-2 ring-offset-orange-50/50 md:h-28 md:w-28 md:rounded-[36px]">
            <FileSearch
              className="absolute h-12 w-12 translate-x-1 translate-y-1 text-orange-300/40 blur-[2px] md:h-14 md:w-14"
              strokeWidth={2}
            />
            <FileSearch
              className="relative h-12 w-12 text-orange-600 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <h2 className="mb-3 text-xl font-black text-slate-800 md:text-2xl">
          چیزی پیدا نکردیم!
        </h2>
        <p className="max-w-[300px] text-xs font-medium leading-relaxed text-slate-500 md:text-sm">
          متأسفانه هیچ مقاله‌ای با این مشخصات و فیلترها یافت نشد.
        </p>
        <div className="mt-8 flex w-full flex-col flex-wrap justify-center gap-4 md:w-auto md:flex-row">
          <button
            onClick={() => router.push("/blogs")}
            className="rounded-2xl bg-orange-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-1 hover:bg-orange-700 active:scale-95"
          >
            پاک کردن فیلترها
          </button>
          <Link
            href="/"
            className="flex items-center justify-center rounded-2xl bg-white px-8 py-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 active:scale-95"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  // ======================= لیست مقالات =======================
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {posts.map((post) => (
        <article
          key={post._id}
          className="group relative flex flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-900/5 md:rounded-[32px]"
        >
          {/* بخش تصویر */}
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] md:rounded-[26px]">
            <Image
              src={post.coverImageUrl}
              alt={`کاور مقاله: ${post.title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-slate-900/10 transition-opacity duration-500 group-hover:opacity-0"></div>

            {post.category?.title && (
              <div className="absolute right-3 top-3 rounded-xl bg-white/95 px-3 py-1.5 text-[10px] font-black text-orange-600 shadow-sm backdrop-blur-md">
                {post.category.title}
              </div>
            )}

            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-slate-900/40 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
              <User className="h-3 w-3" />
              {post.author?.name}
            </div>
          </figure>

          {/* محتوای متنی کارت */}
          <div className="flex flex-1 flex-col p-3 md:p-4">
            <div className="mb-3 flex items-center gap-4 text-[10px] font-bold text-slate-400 md:text-xs">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                <time dateTime={new Date(post.createdAt).toISOString()}>
                  {toLocalDateShort(post.createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} دقیقه مطالعه
              </div>
            </div>

            <Link href={`/blogs/${post.slug}`} className="mb-3">
              <h2 className="line-clamp-2 text-base font-black leading-tight text-slate-800 transition-colors group-hover:text-orange-600 md:text-lg">
                {truncateText(post.title, 60)}
              </h2>
            </Link>

            <p className="mb-6 line-clamp-2 text-xs leading-relaxed text-slate-500 md:text-sm">
              {post.briefText}
            </p>

            {/* فوتر کارت: اکشن‌ها */}
            <footer className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
              <div className="flex items-center gap-2">
                {/* لایک */}
                <button
                  disabled={isLiking}
                  onClick={() => likePost(post._id)}
                  aria-label="لایک کردن"
                  className={`flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-rose-600 transition-colors hover:bg-rose-100 ${
                    post.isLiked ? "fill-rose-600" : ""
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${post.isLiked ? "fill-rose-600" : ""}`}
                  />
                  <span className="text-xs font-black">{post.likesCount}</span>
                </button>

                {/* بوکمارک */}
                <button
                  disabled={isBookmarking}
                  onClick={() => bookmarkPost(post._id)}
                  aria-label="ذخیره مقاله"
                  className={`flex items-center justify-center rounded-xl p-2 transition-all duration-300 ${
                    post.isBookmarked
                      ? "bg-orange-100 text-orange-600"
                      : "bg-slate-50 text-slate-400 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <Bookmark
                    className={`h-5 w-5 ${post.isBookmarked ? "fill-orange-600" : ""}`}
                  />
                </button>
              </div>

              <Link
                href={`/blogs/${post.slug}`}
                className="group/btn flex items-center gap-1 text-xs font-black text-orange-600 transition-all hover:gap-2 md:text-sm"
              >
                ادامه مطلب
                <ChevronLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
              </Link>
            </footer>
          </div>
        </article>
      ))}
    </div>
  );
}
