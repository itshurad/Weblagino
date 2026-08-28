import Avatar from "@/ui/Avatar";

export default function Author({ name, avatarUrl }) {
  return (
    <div className="flex items-center gap-x-3">
      <div className="rounded-full ring-2 ring-orange-100 transition-all hover:ring-orange-300">
        <Avatar width={30} src={avatarUrl} alt={`پروفایل ${name}`} />
      </div>
      <span className="text-sm font-bold text-slate-700 transition-colors hover:text-orange-600">
        {name}
      </span>
    </div>
  );
}
