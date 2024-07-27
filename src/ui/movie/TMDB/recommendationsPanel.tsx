import { TMDBMovie } from "@/lib/defination";
import MovieCard from "@/ui/app/movieCard";

export default function RecommendationsPanel({
  TMDB_Movie,
}: {
  TMDB_Movie: TMDBMovie;
}) {
  return (
    <section>
      <p className="font-semibold">Recommendations :</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-2">
        {TMDB_Movie.recommendations?.results?.map((mov) => (
          <MovieCard
            key={mov.id}
            link={`/movie/TMDB/${mov.media_type}/${mov.id}`}
            poster={`https://image.tmdb.org/t/p/w154/${mov.poster_path}`}
            title={mov.title || mov.name}
          />
        ))}
      </div>
    </section>
  );
}
