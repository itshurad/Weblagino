import Avatar from "@/ui/Avatar";
import Button from "@/ui/Button";
import { CornerDownLeft } from "lucide-react";

export default function Comment({ comment, onAddComment }) {
  return (
    <article className="flex flex-col gap-4">
      <header className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-x-3">
          <Avatar
            height={38}
            width={38}
            alt={comment.user?.name || "کاربر"}
            src={comment.user?.avatarUrl}
            className="rounded-full ring-2 ring-slate-100"
          />
          <div className="flex w-full flex-col">
            <span className="mb-0.5 text-sm font-black text-slate-800">
              {comment.user?.name}
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              {comment.createdAt}
            </span>
          </div>
        </div>

        <div>
          {comment.openToComment && (
            <Button
              onClick={onAddComment}
              variant="secondary"
              className="flex items-center gap-x-1.5 rounded-xl bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-100"
            >
              <CornerDownLeft className="h-4 w-4" />
              <span>پاسخ</span>
            </Button>
          )}
        </div>
      </header>

      <p className="text-sm leading-loose text-slate-600 md:text-base md:leading-loose">
        {comment.content?.text}
      </p>
    </article>
  );
}
