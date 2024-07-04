"use client";
import { searchMovies } from "@/lib/data";
import { movie, queryResult } from "@/lib/defination";
import MovieCard from "@/ui/movies/movieCard";
import Paginate from "@/ui/movies/paginate";
import SearchPanel from "@/ui/movies/searchPanel";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SearchMovies() {
  return (
    <Suspense>
      <SuspendedElement />
    </Suspense>
  );
}

function SuspendedElement() {
  const [queryResult, setQueryResult] = useState<queryResult>();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [activePage, setActivePage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    // title type genres countries year test
    (async () => {
      setActivePage(Number(searchParams.get("page")));

      const title = searchParams.get("title");
      const type = searchParams.get("type");
      const genres = searchParams.getAll("genres");
      const countries = searchParams.getAll("countries");
      const year = searchParams.getAll("year");
      const sortOrder = formatSortOrder(searchParams.get("sortOrder"));
      const sortBy =
        searchParams.get("Sort By") &&
        formatSortBy(searchParams.get("Sort By"));
      // const pageNum = searchParams.get("page");

      const query = {
        ...(title && { title: { $regex: title, $options: "i" } }),
        // ...(title && { $text: { $search: { text: title, path: "title" } } }),
        ...(type && { type }),
        ...(genres.length && { genres: { $in: genres } }),
        ...(countries.length && { countries: { $in: countries } }),
        ...(year.length && { year: { $in: year } }),
      };

      const req = {
        query,
        limit: 20,
        skip: (activePage - 1) * 20,
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      };

      const data = await searchMovies(req);
      const searchResult = JSON.parse(data);
      setQueryResult(searchResult);
    })();
  }, [searchParams, activePage]);

  return (
    <div className="gap-2">
      <SearchPanel searchParams={searchParams} params={params} />
      <Paginate
        noOfMovies={queryResult?.noOfMovies}
        params={params}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1">
        {queryResult?.movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id.toString()} />
        ))}
      </div>
      {queryResult?.noOfMovies && queryResult.noOfMovies > 20 && (
        <Paginate
          noOfMovies={queryResult?.noOfMovies}
          params={params}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
}

function formatSortBy(sortBy: string | null) {
  let data = sortBy?.toLowerCase().split(" ").join(".");
  return data;
}

function formatSortOrder(sortOrder: string | null): 1 | -1 {
  if (sortOrder === "ascending") return 1;
  else return -1;
}
