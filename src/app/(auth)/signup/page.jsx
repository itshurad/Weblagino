"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import SpinnerMini from "@/ui/SpinnerMini";
import { useAuth } from "@/context/AuthContext";

const schema = yup.object({
  name: yup
    .string()
    .min(5, "حداقل ۵ کاراکتر الزامی است")
    .max(30, "حداکثر ۳۰ کاراکتر مجاز است")
    .required("نام و نام خانوادگی الزامی است"),
  email: yup
    .string()
    .email("فرمت ایمیل نامعتبر است")
    .required("ایمیل الزامی است"),
  password: yup
    .string()
    .min(6, "حداقل ۶ کاراکتر الزامی است")
    .required("رمز عبور الزامی است"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signup } = useAuth();

  const onSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div className="w-full space-y-10">
      {/* هدر مینیمال */}
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-[#022626]">
          ثبت‌نام
        </h1>
        <p className="text-sm font-medium text-slate-500">
          برای دسترسی به امکانات، حساب خود را بسازید.
        </p>
      </header>

      {/* فرم */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <RHFTextField
            name="name"
            label="نام و نام خانوادگی"
            register={register}
            placeholder="علی محمدی"
            errors={errors}
          />

          <RHFTextField
            name="email"
            label="ایمیل"
            register={register}
            dir="ltr"
            placeholder="name@example.com"
            errors={errors}
          />

          <RHFTextField
            name="password"
            label="رمز عبور"
            register={register}
            type="password"
            dir="ltr"
            placeholder="••••••••"
            errors={errors}
          />
        </div>

        <div className="pt-2">
          {/* دکمه اصلی با رنگ تیره برای ایجاد تنوع با صفحه لاگین یا استفاده از همان استایل */}
          <Button
            type="submit"
            fullWidth
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#E05D4B] text-sm font-bold text-white transition-all hover:bg-[#E05D4B] hover:shadow-lg hover:shadow-[#E05D4B]/20 active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <SpinnerMini />
                <span>در حال ایجاد حساب...</span>
              </div>
            ) : (
              "تکمیل ثبت‌نام"
            )}
          </Button>
        </div>

        {/* لینک انتقال */}
        <div className="text-center">
          <p className="text-[13px] font-bold text-slate-500">
            از قبل حساب دارید؟{" "}
            <Link
              href="/signin"
              className="text-[#E05D4B] transition-colors hover:text-[#c95343]"
            >
              وارد شوید
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
