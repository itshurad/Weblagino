import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/services/postServices";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { ButtonsDesctop, ButtonsMobile } from "./Button";

// Components
import RelatedPost from "../_components/RelatedPost";
import PostComment from "../_components/comment/PostComment";

// Icons
import {
  Clock,
  CalendarDays,
  UserCircle2,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";

// =========================================================
// SEO & Metadata
// =========================================================
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.postSlug);
  if (!post) return { title: "یافت نشد" };

  return {
    title: post.title,
    description: post.briefText,
    openGraph: {
      images: [post.coverImageUrl],
    },
  };
}

export default async function SinglePost({ params }) {
  const post = await getPostBySlug(params.postSlug);
  if (!post) notFound();

  // JSON-LD برای سئوی محتوایی (Article Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.coverImageUrl,
    author: {
      "@type": "Person",
      name: post.author?.name || "نویسنده",
    },
    datePublished: new Date(post.createdAt).toISOString(),
    description: post.briefText,
  };

  return (
    <>
      {/* تزریق اسکیما مارک‌آپ برای گوگل */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto max-w-[1440px] px-4 py-8 lg:px-8">
        {/* ======================= HEADER (Article Title & Image) ======================= */}
        <header className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 flex flex-col gap-y-6 lg:order-1 lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-orange-600"></span>
              <span className="text-sm font-bold text-orange-600">
                {post.category?.title || "دسته‌بندی نشده"}
              </span>
            </div>

            <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl lg:text-5xl lg:leading-[1.25]">
              {post.title}
            </h1>

            <p className="text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
              {post.briefText}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md shadow-slate-200">
                  <div className="flex h-full w-full items-center justify-center bg-orange-50 text-orange-600">
                    <UserCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">
                    {post.author?.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    نویسنده ارشد
                  </span>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-slate-200 sm:block"></div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {toLocalDateShort(post.createdAt)}
                  </time>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-2 py-1 text-orange-700">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime} دقیقه مطالعه</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 lg:col-span-5">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-orange-100 to-amber-100 opacity-70 blur-2xl"></div>
            <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] shadow-2xl shadow-orange-900/10 ring-4 ring-white lg:aspect-square">
              <Image
                className="object-cover transition-transform duration-700 hover:scale-105"
                fill
                src={post.coverImageUrl}
                alt={`تصویر مقاله: ${post.title}`}
                priority
              />
            </figure>
          </div>
        </header>

        {/* ======================= BODY (Content & Sidebars) ======================= */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* سایدبار ابزارک‌ها (دسکتاپ) */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-32 flex flex-col items-center gap-6">
              <ButtonsDesctop post={post} />
            </div>
          </aside>

          {/* محتوای متنی مقاله */}
          <div className="lg:col-span-7">
            <article className="prose prose-lg prose-slate prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-800 prose-p:leading-loose prose-p:text-slate-600 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-lg prose-strong:text-slate-800 max-w-none">
              {post.text}
            </article>

            {/* تگ‌ها */}
            <div
              className="mt-12 flex flex-wrap gap-2 border-t border-slate-100 pt-8"
              aria-label="تگ‌های مقاله"
            >
              {["تکنولوژی", "برنامه‌نویسی", "ری‌اکت"].map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="cursor-pointer rounded-xl bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* بخش نظرات */}
            <section className="mt-16" id="comments">
              <header className="mb-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-black text-slate-800">گفتگوها</h3>
              </header>
              <div className="rounded-[32px] border border-slate-100 bg-slate-50/50 p-6 md:p-8">
                <PostComment post={post} />
              </div>
            </section>
          </div>

          {/* ======================= RIGHT SIDEBAR (Author & Related) ======================= */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* ۱. کارت نویسنده */}
              <section className="group relative overflow-hidden rounded-[32px] bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/20">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-600 opacity-40 blur-[60px] transition-opacity duration-500 group-hover:opacity-60"></div>
                <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-amber-500 opacity-30 blur-[60px] transition-opacity duration-500 group-hover:opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-white/20"></div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 shadow-lg ring-4 ring-slate-800">
                      <UserCircle2 className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black tracking-tight">
                    {post.author?.name}
                  </h3>
                  <p className="mb-4 text-xs font-medium text-orange-200">
                    عضویت:{" "}
                    {toLocalDateShort(post.author?.createdAt || Date.now())}
                  </p>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-300/90">
                    علاقمند به دنیای وب و تکنولوژی‌های جدید. اشتراک دانش و
                    تجربیات برنامه‌نویسی هدف اصلی من است.
                  </p>

                  <div className="mb-6 flex w-full justify-center gap-8 border-y border-white/10 py-4">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-white">12</span>
                      <span className="text-[10px] text-slate-400">مـقاله</span>
                    </div>
                    <div className="h-full w-px bg-white/10"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-white">1.2k</span>
                      <span className="text-[10px] text-slate-400">بازدید</span>
                    </div>
                  </div>

                  <button className="w-full rounded-2xl bg-white py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-600 hover:shadow-orange-500/20 active:scale-95">
                    مشاهده پروفایل کامل
                  </button>
                </div>
              </section>

              {/* ۲. پست‌های مرتبط */}
              {post.related && post.related.length > 0 && (
                <section className="flex flex-col gap-5">
                  <header className="flex items-center justify-between px-2">
                    <h4 className="flex items-center gap-2 text-lg font-black text-slate-800">
                      <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                      پیشنهادهای ویژه
                    </h4>
                  </header>

                  <div className="flex flex-col gap-4">
                    {post.related.map((item) => (
                      <Link
                        key={item._id}
                        href={`/blogs/${item.slug}`}
                        className="group"
                      >
                        <div className="flex items-center gap-4 rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:bg-orange-50/50 hover:shadow-md hover:ring-orange-100">
                          <figure className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[18px]">
                            <Image
                              src={item.coverImageUrl}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </figure>
                          <div className="flex flex-col justify-center gap-1.5 overflow-hidden">
                            <h5 className="truncate text-sm font-bold text-slate-700 transition-colors group-hover:text-orange-600">
                              {item.title}
                            </h5>
                            <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.readingTime} دقیقه
                              </span>
                              <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                              <span>{toLocalDateShort(item.createdAt)}</span>
                            </div>
                          </div>
                          <div className="ml-2 mr-auto text-orange-500 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
                            <ChevronLeft className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* ======================= MOBILE BOTTOM ACTION BAR ======================= */}
      <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-full bg-white/90 px-8 py-3.5 shadow-2xl shadow-orange-900/10 ring-1 ring-slate-200 backdrop-blur-xl lg:hidden">
        <ButtonsMobile post={post} />
      </div>
    </>
  );
}
