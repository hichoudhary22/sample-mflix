import { Popular_TMDB_Movies } from "@/lib/defination";
import { getUpcomingTMDBMovies } from "@/lib/tmdbData";
import ImageWithFallback from "@/ui/app/imgWithFallback";
import Link from "next/link";

export default async function UpcomingTMDBMovies() {
  const data = await getUpcomingTMDBMovies();
  const movies: Popular_TMDB_Movies = JSON.parse(data);
  return (
    <section className="my-3">
      <p className="text-2xl font-semibold">Upcoming Movies :</p>
      <div className="relative  flex gap-2 overflow-scroll">
        {movies.results.map((mov) => (
          <Link href={`/movie/TMDB/movie/${mov.id}`} key={mov.id}>
            <ImageWithFallback
              src={`https://image.tmdb.org/t/p/w1280/${mov.poster_path}`}
              fallback="/movie.svg"
              alt="movie poster"
              width={10}
              height={10}
              className=" z-10 min-w-[200px] rounded-md"
            />
            <p className="absolute bottom-0 overflow-hidden p-2 text-white">
              {mov.title || mov.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
