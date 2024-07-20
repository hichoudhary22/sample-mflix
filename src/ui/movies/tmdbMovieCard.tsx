import { TMDBMovie } from "@/lib/defination";
import Image from "next/image";
import Link from "next/link";

export default function TMDBMovieCard({ movie }: { movie: TMDBMovie }) {
  return (
    <Link href={`/movie/TMDB/${movie.media_type}/${movie.id}`}>
      <div className="relative aspect-[2/3] min-w-[150px] max-w-[230px] transition-all hover:z-10 hover:scale-110">
        <Image
          fill
          priority={false}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : "/movie.svg"
          }
          alt="movie image"
          sizes="40vw"
          style={{
            borderRadius: "6px",
            filter: "brightness(.80)",
          }}
        />
        <h1 className="absolute bottom-0 mx-1 text-white">{movie.title}</h1>
      </div>
    </Link>
  );
}
