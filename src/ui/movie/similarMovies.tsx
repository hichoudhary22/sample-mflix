import { getAllMovies } from "@/lib/data";
import MovieCard from "../movies/movieCard";
import { movie } from "@/lib/defination";

export default async function SimilarMovies({
  type,
  value,
}: {
  type: string;
  value: string;
}) {
  const simMovies: Array<movie> = await getAllMovies({ [type]: value });
  return (
    <div>
      <h2 className="my-4 text-2xl">
        movies with
        <span className="rounded-3xl bg-green-400 px-2.5 py-0.5">
          {value}
        </span>{" "}
        as <span className="rounded-3xl bg-red-400 px-2.5 py-0.5">{type}</span>
      </h2>
      <div className="flex gap-1 overflow-x-scroll">
        {simMovies.map((movie) => (
          <MovieCard key={movie._id.toString()} movie={movie} />
        ))}
      </div>
      <hr />
    </div>
  );
}
