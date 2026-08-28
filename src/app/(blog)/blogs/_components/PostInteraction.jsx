"use client";

import React from "react";
import { MessageCircle, Heart } from "lucide-react";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianDigits } from "@/utils/numberFormatter";
import useLike from "@/hooks/useLike";

export default function PostInteraction({ post }) {
  // استفاده از هوک اختصاصی لایک
  const { likePost, isLiking } = useLike();

  return (
    <div className="flex items-center gap-2">
      {/* دکمه نظرات */}
      <ButtonIcon
        variant="secondary"
        className="hover:bg-orange-50 hover:text-orange-600"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-bold">
          {toPersianDigits(post.commentsCount || 0)}
        </span>
      </ButtonIcon>

      {/* دکمه لایک */}
      <ButtonIcon
        variant="red"
        disabled={isLiking}
        onClick={() => likePost(post._id)}
        className={`${post.isLiked ? "bg-rose-50 text-rose-600" : ""}`}
      >
        <Heart
          className={`h-5 w-5 transition-transform active:scale-75 ${
            post.isLiked ? "fill-rose-600 text-rose-600" : ""
          }`}
        />
      </ButtonIcon>
    </div>
  );
}
