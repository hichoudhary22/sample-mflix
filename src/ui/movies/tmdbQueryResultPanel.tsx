import { TMDBMovie, TMDBQueryResult } from "@/lib/defination";
import Paginate from "./paginate";
import TMDBMovieCard from "./tmdbMovieCard";

export default function TMDBQueryResultPanel({
  TMDBQueryResult,
  activePage,
  setActivePage,
  params,
}: {
  TMDBQueryResult: TMDBQueryResult;
  activePage: number;
  setActivePage: Function;
  params: URLSearchParams;
}) {
  return (
    <>
      <Paginate
        activePage={activePage}
        setActivePage={setActivePage}
        noOfMovies={TMDBQueryResult.total_results}
        params={params}
      />
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1">
        {TMDBQueryResult.results.map((movie: TMDBMovie) => (
          <TMDBMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {
        <Paginate
          activePage={activePage}
          setActivePage={setActivePage}
          noOfMovies={TMDBQueryResult.total_results}
          params={params}
        />
      }
    </>
  );
}
