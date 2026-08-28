import Header from "@/components/Header";
import vazirFont from "@/constants/localFont";
import AuthProvider from "@/context/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

// =========================================================
// SEO & Metadata Configuration
// =========================================================
export const metadata = {
  title: {
    template: "%s | بلاگ اپ",
    default: "بلاگ اپ | پلتفرم مدیریت محتوا",
  },
  description: "وب اپلیکیشن پیشرفته مدیریت بلاگ‌ها و نظرات کاربران",
  // تغییر رنگ نوار مرورگر در موبایل به نارنجی متناسب با تم سایت
  themeColor: "#ea580c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="antialiased">
      <body
        className={`${vazirFont.variable} min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900`}
      >
        {/* هماهنگ‌سازی استایل Toaster با فونت و تم کلی سایت */}
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-sans font-bold text-sm shadow-lg",
          }}
        />

        <ReactQueryProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              {/* کامپوننت هدر که ایمپورت کرده بودید را اینجا می‌توانید استفاده کنید */}
              {/* <Header /> */}

              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
