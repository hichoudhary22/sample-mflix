import Link from "next/link";

export default function QueryElement({ k, val }: { k: string; val: string }) {
  return (
    <Link href={`/movies/?${k}=${val}`}>
      <span className="text-blue-500">{val} &#183; </span>
    </Link>
  );
}
