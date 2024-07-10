import { mongoDBQueryResult } from "@/lib/defination";
import Paginate from "./paginate";
import MovieCard from "./movieCard";

export default function MongoDBResultPanel({
  mongoDBQueryResult,
  params,
  setActivePage,
  activePage,
}: {
  mongoDBQueryResult: mongoDBQueryResult;
  params: URLSearchParams;
  setActivePage: Function;
  activePage: number;
}) {
  return (
    <>
      <Paginate
        noOfMovies={mongoDBQueryResult?.noOfMovies}
        params={params}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1">
        {mongoDBQueryResult?.movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id.toString()} />
        ))}
      </div>
      {mongoDBQueryResult?.noOfMovies && mongoDBQueryResult.noOfMovies > 20 && (
        <Paginate
          noOfMovies={mongoDBQueryResult?.noOfMovies}
          params={params}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </>
  );
}
