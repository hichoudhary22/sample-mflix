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
        <p className="my-2">
          <span>Showing all the Movies that has </span>
          <span className="whitespace-nowrap rounded-full border px-3 py-1 text-blue-400">
            {searchParams[Object.keys(searchParams)[0]]}
          </span>
          <span> as </span>
          <span className="rounded-full border px-3 py-1 capitalize text-red-400">
            {Object.keys(searchParams)[0]}
          </span>
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
