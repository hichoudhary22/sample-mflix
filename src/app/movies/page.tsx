import { getAllMongoMovies } from "@/lib/mongoData";
import MovieCard from "@/ui/app/movieCard";
import NowPlayingTMDBMovies from "@/ui/movies/nowPlayingTMDBMovies";
import PopularTMDBMovies from "@/ui/movies/popularTMDBMovies";
import UpcomingTMDBMovies from "@/ui/movies/searchPanel/upcomingTMDBMovies";
import TopRatedTMDBMovies from "@/ui/movies/topRatedTMDBMovies";

export default async function Movies({}) {
  const allMovies = await getAllMongoMovies();
  return (
    <main>
      <PopularTMDBMovies />
      <TopRatedTMDBMovies />
      <NowPlayingTMDBMovies />

      <section className="my-3">
        <p className="text-2xl font-semibold">Mongo Movies :</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1  ">
          {allMovies.map((mov) => (
            <MovieCard
              key={mov._id.toString()}
              link={`/movie/mongoDB/${mov._id}`}
              poster={mov.poster}
              title={mov.title}
            />
          ))}
        </div>
      </section>
      <UpcomingTMDBMovies />
    </main>
  );
}
