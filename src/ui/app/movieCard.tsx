import Link from "next/link";
import ImageWithFallback from "./imgWithFallback";

export default function MovieCard({
  link = "",
  poster,
  title = "",
  sizes = "40vw",
  priority = false,
}: {
  link?: string;
  poster: string;
  title?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link href={link}>
      <div className="relative aspect-[2/3] min-w-[150px] max-w-[230px] transition-all hover:z-10 hover:scale-110">
        <ImageWithFallback
          fill
          priority={priority}
          src={poster}
          alt="movie image"
          sizes={sizes}
          fallback="/movie.svg"
          style={{
            borderRadius: "6px",
            filter: "brightness(.80)",
          }}
        />
        <h1 className="absolute bottom-0 mx-1 text-white">{title}</h1>
      </div>
    </Link>
  );
}
