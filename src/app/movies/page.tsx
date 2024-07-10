import { getAllMovies } from "@/lib/data";
import MovieCard from "@/ui/movies/movieCard";
export default async function Movies({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const allMovies = await getAllMovies(searchParams);
  return (
    <>
      {Object.keys(searchParams)[0] && (
        <p>
          movies containing
          <span className="text-blue-400">
            {searchParams[Object.keys(searchParams)[0]]}
          </span>
          as
          <span className="text-red-400"> {Object.keys(searchParams)[0]}</span>
        </p>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1  ">
        {allMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id.toString()} />
        ))}
      </div>
    </>
  );
}
