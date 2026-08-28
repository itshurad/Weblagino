import ListBox from "@/ui/Listbox";

export default async function CategoryList() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/list`,
      {
        next: { revalidate: 3600 }, // کش کردن دیتا برای پرفورمنس بهتر
      },
    );

    if (!res.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");

    const {
      data: { categories },
    } = await res.json();

    return <ListBox categories={categories} />;
  } catch (error) {
    return (
      <div className="text-xs text-rose-500">
        بارگذاری دسته‌بندی با خطا مواجه شد.
      </div>
    );
  }
}
