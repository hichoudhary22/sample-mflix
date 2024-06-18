import { getAllMovies } from "@/lib/data";
import { movie } from "@/lib/defination";
import MovieCard from "../movies/movieCard";

export default async function RelatedMovies({ movie }: { movie: movie }) {
  const Id = movie._id.toString();
  const relatedMoviesPromise: Array<Promise<movie[]>> = [];

  movie.cast?.map((c) =>
    relatedMoviesPromise.push(getAllMovies({ cast: c }, 5)),
  );
  movie.directors?.map((d) =>
    relatedMoviesPromise.push(getAllMovies({ directors: d }, 5)),
  );
  movie.writers?.map((w) =>
    relatedMoviesPromise.push(getAllMovies({ writers: w }, 5)),
  );
  movie.languages?.map((l) =>
    relatedMoviesPromise.push(getAllMovies({ languages: l }, 5)),
  );

  const relatedMovies: Array<movie> = (
    await Promise.all(relatedMoviesPromise)
  ).flat();

  const filteredRelatedMovies = relatedMovies.filter(
    (mov: movie) => mov._id.toString() !== Id,
  );

  return (
    <div>
      <h1>Related Movies</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1">
        {filteredRelatedMovies.map((mov) => (
          <MovieCard movie={mov} key={mov._id.toString()} />
        ))}
      </div>
    </div>
  );
}
