"use client";
import { searchMovies, searchTMDB } from "@/lib/data";
import { movie, mongoDBQueryResult, TMDBQueryResult } from "@/lib/defination";
import MongoDBResultPanel from "@/ui/movies/mongoDBResultPanel";
import MovieCard from "@/ui/movies/movieCard";
import Paginate from "@/ui/movies/paginate";
import SearchPanel from "@/ui/movies/searchPanel";
import TMDBQueryResultPanel from "@/ui/movies/tmdbQueryResultPanel";
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
  const [mongoDBQueryResult, setMongoDBQueryResult] =
    useState<mongoDBQueryResult>();
  const [TMDBQueryResult, setTMDBQueryResult] = useState<TMDBQueryResult>();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [searchedDB, setSearchedDB] = useState(
    searchParams.get("searchedDB") || "MongoDB",
  );

  const [activePage, setActivePage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    // title type genres countries year test
    (async () => {
      setActivePage(Number(searchParams.get("page") || 1));

      const title = searchParams.get("title") || "";
      const type = searchParams.get("type");
      const genres = searchParams.getAll("genres");
      const countries = searchParams.getAll("countries");
      const year = searchParams.getAll("year");
      const sortOrder = formatSortOrder(searchParams.get("sortOrder"));
      const sortBy =
        searchParams.get("Sort By") &&
        formatSortBy(searchParams.get("Sort By"));
      setSearchedDB(searchParams.get("searchedDB") || "MongoDB");
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
        page: activePage,
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        // ...(searchedDB && { searchedDB }),
      };

      const data =
        searchedDB === "MongoDB"
          ? await searchMovies(req)
          : await searchTMDB(title, activePage);
      const searchResult = JSON.parse(data);

      searchedDB === "MongoDB"
        ? setMongoDBQueryResult(searchResult)
        : setTMDBQueryResult(searchResult);
    })();
  }, [searchParams, activePage, searchedDB]);

  return (
    <div className="gap-2">
      <SearchPanel searchParams={searchParams} params={params} />
      {searchedDB === "MongoDB" && mongoDBQueryResult && (
        <MongoDBResultPanel
          params={params}
          activePage={activePage}
          setActivePage={setActivePage}
          mongoDBQueryResult={mongoDBQueryResult}
        />
      )}
      {searchedDB === "TMDB" && TMDBQueryResult && (
        <TMDBQueryResultPanel
          TMDBQueryResult={TMDBQueryResult}
          activePage={activePage}
          setActivePage={setActivePage}
          params={params}
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
