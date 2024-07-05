import Link from "next/link";
export default function GenerePill({ g, sm }: { g: string; sm?: boolean }) {
  return (
    <div
      className={
        sm
          ? "my-1 rounded-full border px-1 text-sm"
          : "rounded-3xl border-[2px] px-3 py-1"
      }
    >
      <Link href={`/movies?genres=${g}`}>{g}</Link>
    </div>
  );
}
