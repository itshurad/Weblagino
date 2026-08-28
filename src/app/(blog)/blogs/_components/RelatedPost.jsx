import React from "react";
import CoverImage from "./CoverImage";
import Author from "./Author";

export default function RelatedPost({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <ul className="flex flex-col gap-4 overflow-y-auto pr-1">
      {posts.map((item) => (
        <li
          key={item._id}
          className="group flex flex-col gap-3 rounded-[24px] border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-md"
        >
          {/* کاور با استایل جدید */}
          <CoverImage
            coverImageUrl={item.coverImageUrl}
            title={item.title}
            slug={item.slug}
          />

          <div className="flex flex-col gap-2 px-1">
            <h5 className="line-clamp-2 text-sm font-bold leading-tight text-slate-700 transition-colors group-hover:text-orange-600">
              {item.title}
            </h5>

            {/* کامپوننت Author رو هم در اینجا میتونید بهینه کنید */}
            {item.author && (
              <div className="mt-1 flex origin-right scale-95 items-center opacity-80">
                <Author {...item.author} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
