"use client";
import Button from "@/ui/Button";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Comment from "./Comment";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import CommentForm from "./CommentForm";
import Modal from "@/ui/Modal";

function PostComment({ post: { comments, _id: postId } }) {
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const addNewCommentHandler = (parent) => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setParent(parent);
    setOpen(true);
  };

  return (
    <div className="mb-10">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={parent ? "پاسخ به نظر" : "نظر جدید"}
        description={parent ? parent.user.name : "نظر خود را وارد کنید"}
      >
        <CommentForm
          onClose={() => setOpen(false)}
          parentId={parent ? parent._id : null}
          postId={postId}
        />
      </Modal>
      <div className="mb-8 flex flex-col items-center justify-between gap-y-3 lg:flex-row">
        <h2 className="text-secondary-800 text-2xl font-bold">نظرات</h2>
        <Button
          onClick={() => addNewCommentHandler(null)}
          variant="outline"
          className="flex items-center py-2"
        >
          <QuestionMarkCircleIcon className="ml-2 w-4" />
          <span>ثبت نظر جدید</span>
        </Button>
      </div>
      <div className="post-comments bg-secondary-0 space-y-8 rounded-xl px-3 py-6 lg:px-6">
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div className="border-secondary-200 mb-3 rounded-xl border p-2 sm:p-4">
                  <Comment
                    comment={comment}
                    onAddComment={() => addNewCommentHandler(comment)}
                  />
                </div>
                <div className="post-comments__answer mr-2 space-y-3 sm:mr-8">
                  {comment.answers.map((item, index) => {
                    return (
                      <div key={item._id} className="relative">
                        <div
                          className={classNames(
                            "answer-item border-secondary-100 bg-secondary-50/80 rounded-xl border p-2 sm:p-4",
                            {
                              "last-item": index + 1 === comment.answers.length,
                            },
                          )}
                        >
                          <Comment comment={item} key={item._id} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
}
export default PostComment;
