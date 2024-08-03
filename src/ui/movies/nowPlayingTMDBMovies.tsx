import { Popular_TMDB_Movies } from "@/lib/defination";
import { getNowPlayingTMDBMovies } from "@/lib/tmdbData";
import ImageWithFallback from "../app/imgWithFallback";
import Link from "next/link";

export default async function NowPlayingTMDBMovies() {
  const data = await getNowPlayingTMDBMovies();
  const movies: Popular_TMDB_Movies = JSON.parse(data);
  return (
    <section className="my-3">
      <p className="text-2xl font-semibold">Now Playing :</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-2">
        {movies.results.map((mov) => (
          <Link
            href={`/movie/TMDB/movie/${mov.id}`}
            key={mov.id}
            className="relative"
          >
            <ImageWithFallback
              src={`https://image.tmdb.org/t/p/w1280${mov.poster_path}`}
              alt="movie image"
              fallback="/movie.svg"
              width={10}
              height={10}
              className="w-auto rounded-md brightness-[0.9]"
            />
            <p className="absolute bottom-0 z-10">{mov.title || mov.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
