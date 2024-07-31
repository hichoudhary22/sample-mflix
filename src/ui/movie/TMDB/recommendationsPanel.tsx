import { mongoMovie, TMDBMovie } from "@/lib/defination";
import MovieCard from "@/ui/app/movieCard";

export default function RecommendationsPanel({
  TMDB_Movie,
  mongoMovie,
}: {
  TMDB_Movie?: TMDBMovie;
  mongoMovie?: mongoMovie;
}) {
  if (TMDB_Movie) return <TMDBRecommendationsPanel TMDB_Movie={TMDB_Movie} />;
  else if (mongoMovie) return <MongoRecommendationsPanel movie={mongoMovie} />;
  else return null;
}
function TMDBRecommendationsPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
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

function MongoRecommendationsPanel({ movie }: { movie: mongoMovie }) {
  return (
    <section>
      <p className="text-xl font-semibold underline">Recommendations :</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-2">
        {movie.recommendations?.map((mov) => (
          <MovieCard
            key={mov._id.toString()}
            link={`/movie/mongoDB/${mov._id}`}
            poster={mov.poster}
            title={mov.title}
          />
        ))}
      </div>
    </section>
  );
}
