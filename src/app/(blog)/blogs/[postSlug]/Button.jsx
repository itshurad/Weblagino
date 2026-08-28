"use client";

import React from "react";
import useLike from "@/hooks/useLike";
import useBookmark from "@/hooks/useBookmark";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import toast from "react-hot-toast";

// =========================================================
// Mobile Action Buttons (Bottom Bar)
// =========================================================
export function ButtonsMobile({ post }) {
  const { likePost } = useLike();
  const { bookmarkPost } = useBookmark();

  const handleShare = () => {
    toast("این ویژگی به‌زودی اضافه می‌شود", { icon: "🔜" });
  };

  return (
    <>
      <button
        onClick={() => likePost(post._id)}
        aria-label="لایک کردن"
        className={`transition-colors active:scale-95 ${
          post.isLiked
            ? "fill-rose-500 text-rose-500"
            : "text-slate-400 hover:text-rose-500"
        }`}
      >
        <Heart className="h-6 w-6" />
      </button>

      <div className="h-4 w-px bg-slate-200"></div>

      <button
        onClick={() => bookmarkPost(post._id)}
        aria-label="ذخیره مقاله"
        className="text-slate-400 transition-colors hover:text-orange-600 active:scale-95"
      >
        <Bookmark className="h-6 w-6" />
      </button>

      <div className="h-4 w-px bg-slate-200"></div>

      <button
        onClick={handleShare}
        aria-label="اشتراک‌گذاری"
        className="text-slate-400 transition-colors hover:text-slate-800 active:scale-95"
      >
        <Share2 className="h-6 w-6" />
      </button>
    </>
  );
}

// =========================================================
// Desktop Action Buttons (Sticky Sidebar)
// =========================================================
export function ButtonsDesctop({ post }) {
  const { likePost } = useLike();
  const { bookmarkPost } = useBookmark();

  const handleShare = () => {
    toast("این ویژگی به‌زودی اضافه می‌شود", { icon: "🔜" });
  };

  return (
    <>
      <FloatingActionBtn
        icon={<Heart className={post.isLiked ? "fill-rose-500" : ""} />}
        count={post.likesCount}
        activeColor="text-rose-500"
        onClick={() => likePost(post._id)}
        ariaLabel="لایک"
      />
      <FloatingActionBtn
        icon={<Bookmark />}
        activeColor="text-orange-600"
        onClick={() => bookmarkPost(post._id)}
        ariaLabel="ذخیره"
      />
      <FloatingActionBtn
        icon={<Share2 />}
        onClick={handleShare}
        ariaLabel="اشتراک‌گذاری"
      />

      <div className="my-2 h-px w-8 bg-slate-200"></div>

      <FloatingActionBtn
        icon={<MessageCircle />}
        count={post.commentsCount || 0}
        ariaLabel="نظرات"
        activeColor="text-orange-600"
      />
    </>
  );
}

// =========================================================
// Floating Action Button Component (Base)
// =========================================================
function FloatingActionBtn({
  icon,
  onClick,
  count,
  activeColor = "text-orange-600",
  ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group relative flex flex-col items-center gap-1 hover:${activeColor}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-orange-100">
        {React.cloneElement(icon, {
          className: "w-5 h-5 transition-transform group-hover:scale-110",
        })}
      </div>
      {count !== undefined && count > 0 && (
        <span className="text-[10px] font-bold text-slate-400 transition-colors group-hover:text-inherit">
          {count}
        </span>
      )}
    </button>
  );
}
