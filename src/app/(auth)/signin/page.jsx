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
  email: yup
    .string()
    .email("فرمت ایمیل نامعتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  password: yup.string().required("وارد کردن رمز عبور الزامی است"),
});

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signin } = useAuth();

  const onSubmit = async (values) => {
    await signin(values);
  };

  return (
    <div className="w-full space-y-10">
      {/* هدر مینیمال */}
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-[#022626]">
          ورود
        </h1>
        <p className="text-sm font-medium text-slate-500">
          خوش آمدید، لطفاً اطلاعات خود را وارد کنید.
        </p>
      </header>

      {/* فرم */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <RHFTextField
            name="email"
            label="ایمیل"
            register={register}
            dir="ltr"
            placeholder="name@example.com"
            errors={errors}
          />

          <div className="space-y-2">
            <RHFTextField
              name="password"
              label="رمز عبور"
              register={register}
              type="password"
              dir="ltr"
              placeholder="••••••••"
              errors={errors}
            />
            {/* لینک فراموشی رمز با استایل یکپارچه */}
            <div className="flex justify-start">
              <Link
                href="#"
                className="text-[12px] font-bold text-slate-400 transition-colors hover:text-[#E05D4B]"
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-2">
          {/* دکمه اصلی با رنگ مرجانی/نارنجی اختصاصی */}
          <Button
            type="submit"
            fullWidth
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#E05D4B] text-sm font-bold text-white transition-all hover:bg-[#c95343] hover:shadow-lg hover:shadow-[#E05D4B]/20 active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <SpinnerMini />
                <span>کمی صبر کنید...</span>
              </div>
            ) : (
              "ورود به حساب"
            )}
          </Button>
        </div>

        {/* لینک انتقال */}
        <div className="text-center">
          <p className="text-[13px] font-bold text-slate-500">
            حساب کاربری ندارید؟{" "}
            <Link
              href="/signup"
              className="text-[#022626] transition-colors hover:text-[#E05D4B]"
            >
              ثبت‌نام کنید
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
