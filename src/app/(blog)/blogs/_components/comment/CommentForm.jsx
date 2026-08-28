"use client";

import { useState, useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { createComment } from "@/lib/action";
import SubmitButton from "@/ui/SubmitButton";
import TextArea from "@/ui/TextArea";

const initialState = {
  error: "",
  message: "",
};

export default function CommentForm({ postId, parentId, onClose }) {
  const [text, setText] = useState("");
  const [state, formAction] = useActionState(createComment, initialState);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  return (
    <div className="mt-4 flex justify-center">
      <div className="w-full max-w-md">
        <form
          className="space-y-6"
          action={async (formData) => {
            await formAction({ formData, postId, parentId });
          }}
        >
          <TextArea
            name="text"
            label="متن نظر شما"
            value={text}
            isRequired
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-2xl border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-orange-500/20"
          />
          <SubmitButton className="w-full rounded-xl bg-orange-600 py-3 text-sm font-bold text-white transition-all hover:bg-orange-700 active:scale-95">
            ثبت نظر
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
