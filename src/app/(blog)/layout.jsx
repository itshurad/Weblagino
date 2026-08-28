"use client";

import React from "react";
import Header from "@/components/Header";
import NavigationBar from "@/ui/NavigationBar";

export default function GeneralLayout({ children }) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 md:px-6 lg:px-8">
      <Header />
      {/* استفاده از main برای سئوی بهتر و مشخص کردن محتوای اصلی */}
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <NavigationBar />
    </div>
  );
}
