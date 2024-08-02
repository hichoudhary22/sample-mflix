import { getPopularTMDBMovies } from "@/lib/tmdbData";
import { Popular_TMDB_Movies, TMDBMovie } from "@/lib/defination";
import Link from "next/link";
import ImageWithFallback from "../app/imgWithFallback";

export default async function PopularTMDBMovies() {
  const data = await getPopularTMDBMovies();
  const popularTMDBMov: Popular_TMDB_Movies = JSON.parse(data);
  return (
    <section className="my-2">
      <p className="text-2xl font-semibold">Popular now :</p>
      <div className="flex gap-2 overflow-scroll">
        {popularTMDBMov.results.map((mov) => (
          <TMDBPosterPanel key={mov.id} movie={mov} />
        ))}
      </div>
    </section>
  );
}

function TMDBPosterPanel({ movie }: { movie: TMDBMovie }) {
  return (
    <Link
      href={`/movie/TMDB/movie/${movie.id}`}
      className="relative min-w-[500px] rounded-md sm:w-[70vw]"
    >
      <ImageWithFallback
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        fallback="/movie.svg"
        alt="movie poster"
        width={10}
        height={10}
        priority={true}
        className="w-auto rounded-md"
      />
      <div className="absolute bottom-0 z-10 flex w-full items-center justify-between p-3  text-white">
        <p className="text-2xl">{movie.name || movie.title}</p>
        <p>
          <span>{movie.release_date.split("-")[0]}</span>{" "}
          <span>{Number(movie.vote_average).toFixed(2)}/10</span>
        </p>
      </div>
    </Link>
  );
}
