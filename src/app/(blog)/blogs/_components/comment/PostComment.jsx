"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquarePlus } from "lucide-react";
import classNames from "classnames";

import { useAuth } from "@/context/AuthContext";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default function PostComment({ post: { comments, _id: postId } }) {
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const addNewCommentHandler = (parentComment) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setParent(parentComment);
    setOpen(true);
  };

  return (
    <section className="mb-10" aria-label="بخش نظرات">
      {/* مودال ثبت نظر */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={parent ? "پاسخ به نظر" : "ثبت نظر جدید"}
        description={
          parent
            ? `در پاسخ به ${parent.user?.name}`
            : "نظرتان را درباره این مقاله با ما به اشتراک بگذارید"
        }
      >
        <CommentForm
          onClose={() => setOpen(false)}
          parentId={parent ? parent._id : null}
          postId={postId}
        />
      </Modal>

      {/* هدر بخش نظرات */}
      <header className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center">
        <h2 className="text-xl font-black text-slate-800 md:text-2xl">
          نظرات کاربران
        </h2>
        <Button
          onClick={() => addNewCommentHandler(null)}
          variant="outline"
          className="flex w-full items-center justify-center gap-2 rounded-xl border-orange-200 bg-orange-50/50 py-2.5 text-orange-600 transition-colors hover:bg-orange-100 md:w-auto md:px-5"
        >
          <MessageSquarePlus className="h-5 w-5" />
          <span className="text-sm font-bold">ثبت نظر جدید</span>
        </Button>
      </header>

      {/* لیست نظرات */}
      <div className="post-comments space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex flex-col">
              {/* نظر اصلی */}
              <div className="mb-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:rounded-[24px] md:p-5">
                <Comment
                  comment={comment}
                  onAddComment={() => addNewCommentHandler(comment)}
                />
              </div>

              {/* پاسخ‌ها (Nested Comments) */}
              {comment.answers && comment.answers.length > 0 && (
                <div className="post-comments__answer mr-4 space-y-3 md:mr-10">
                  {comment.answers.map((item, index) => (
                    <div key={item._id} className="relative">
                      <div
                        className={classNames(
                          "answer-item rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm md:p-5",
                          {
                            "last-item": index + 1 === comment.answers.length,
                          },
                        )}
                      >
                        <Comment comment={item} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
            <MessageSquarePlus className="mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm font-bold text-slate-500">
              هنوز نظری ثبت نشده است. شما اولین نفر باشید!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
