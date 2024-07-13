import { TMDBMovie } from "@/lib/defination";
import Image from "next/image";
import Link from "next/link";

export default function TMDBMovieCard({ movie }: { movie: TMDBMovie }) {
  return (
    <Link href={`/movie/TMDB/${movie.id}/${movie.media_type}`}>
      <div className="relative aspect-[2/3] min-w-[150px] max-w-[230px] transition-all hover:z-10 hover:scale-110">
        <Image
          fill
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
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
