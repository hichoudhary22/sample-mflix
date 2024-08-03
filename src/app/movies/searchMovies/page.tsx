"use client";
import {
  mongoDBQueryResult,
  mongoMovie,
  TMDBMovie,
  TMDBQueryResult,
} from "@/lib/defination";
import { searchMongoMovies } from "@/lib/mongoData";
import { searchTMDB } from "@/lib/tmdbData";
import MovieCard from "@/ui/app/movieCard";
import Paginate from "@/ui/movies/searchPanel/paginate";
import SearchPanel from "@/ui/movies/searchPanel/searchPanel";
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

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [searchedDB, setSearchedDB] = useState(
    searchParams.get("searchedDB") || "MongoDB",
  );

  const [activePage, setActivePage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
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

      const queryType = searchParams.get("queryType") || "movie";

      genrateYearsQuery(year);

      const query = {
        ...(title && { title: { $regex: title, $options: "i" } }),
        // ...(title && { $text: { $search: { text: title, path: "title" } } }),
        ...(type && { type }),
        ...(genres.length && { genres: { $in: genres } }),
        ...(countries.length && { countries: { $in: countries } }),
        ...(year.length && { $or: genrateYearsQuery(year) }),
      };

      const req = {
        query,
        limit: 20,
        page: activePage,
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      };

      const data =
        searchedDB === "MongoDB"
          ? await searchMongoMovies(req)
          : await searchTMDB(title, activePage, queryType);

      const searchResult = JSON.parse(data);

      searchedDB === "MongoDB"
        ? setMongoDBQueryResult(searchResult)
        : setTMDBQueryResult(searchResult);

      setLoading(false);
    })();
  }, [searchParams, activePage, searchedDB]);

  const noOfMovies =
    searchedDB === "MongoDB"
      ? mongoDBQueryResult?.noOfMovies
      : TMDBQueryResult?.total_results;

  return (
    <div className="gap-2">
      <SearchPanel searchParams={searchParams} params={params} />
      {loading ? (
        <p className="my-[150px] text-center text-4xl uppercase">
          ...loading the movies
        </p>
      ) : (
        <>
          <Paginate
            params={params}
            activePage={activePage}
            noOfMovies={noOfMovies}
          />
          <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1">
            {searchedDB === "MongoDB" &&
              mongoDBQueryResult?.movies.map((mov: mongoMovie) => (
                <MovieCard
                  key={mov._id.toString()}
                  link={`/movie/mongoDB/${mov._id}`}
                  poster={mov.poster}
                  title={mov.title}
                />
              ))}
            {searchedDB === "TMDB" &&
              TMDBQueryResult?.results.map((mov: TMDBMovie) => (
                <MovieCard
                  key={mov.id}
                  link={`/movie/TMDB/${params.get("queryType") || "movie"}/${mov.id}`}
                  poster={`https://image.tmdb.org/t/p/w154/${mov.poster_path}`}
                  title={mov.title || mov.name}
                />
              ))}
          </div>
          {noOfMovies === 0 && (
            <p className="my-[150px] text-center text-4xl uppercase">
              {" "}
              no movie found!!!
            </p>
          )}
          {noOfMovies !== undefined && noOfMovies > 20 && (
            <Paginate
              params={params}
              activePage={activePage}
              noOfMovies={noOfMovies}
            />
          )}
        </>
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

function genrateYearsQuery(years: Array<string>) {
  let inArray: Array<number> = [];
  let rangeArr: Array<{}> = [];
  years.map((yr) => {
    switch (yr) {
      case "2000s":
        rangeArr.push({ year: { $gt: 2000, $lte: 2009 } });
        break;
      case "1990s":
        rangeArr.push({ year: { $gt: 1990, $lte: 1999 } });
        break;
      case "1980s":
        rangeArr.push({ year: { $gt: 1980, $lte: 1989 } });
        break;
      case "1970s":
        rangeArr.push({ year: { $gt: 1970, $lte: 1979 } });
        break;
      case "1960s":
        rangeArr.push({ year: { $gt: 1960, $lte: 1969 } });
        break;
      case "1950s":
        rangeArr.push({ year: { $gt: 1950, $lte: 1959 } });
        break;
      case "1940s":
        rangeArr.push({ year: { $gt: 1940, $lte: 1949 } });
        break;
      case "1930s":
        rangeArr.push({ year: { $gt: 1930, $lte: 1939 } });
        break;
      case "1920s":
        rangeArr.push({ year: { $gt: 1920, $lte: 1929 } });
        break;
      case "1910s":
        rangeArr.push({ year: { $gt: 1910, $lte: 1919 } });
        break;
      default:
        inArray.push(Number(yr));
    }
  });

  let yearsQuery = [{ year: { $in: inArray } }, ...rangeArr];
  return yearsQuery;
}
