import { TMDBMovie } from "@/lib/defination";
import TMDBMovieCard from "@/ui/movies/tmdbMovieCard";

export default function RecommendationsPanel({
  TMDB_Movie,
}: {
  TMDB_Movie: TMDBMovie;
}) {
  return (
    <section>
      <p className="font-semibold">Recommendations :</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-2">
        {TMDB_Movie.recommendations.results?.map((movie) => (
          <TMDBMovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
}
