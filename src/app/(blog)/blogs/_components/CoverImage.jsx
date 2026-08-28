import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CoverImage({ coverImageUrl, title, slug }) {
  return (
    <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-slate-100">
      <Link
        href={`/blogs/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`مشاهده مقاله ${title}`}
      >
        <Image
          src={coverImageUrl}
          alt={`کاور مقاله: ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 hover:scale-110"
        />
      </Link>
    </figure>
  );
}
