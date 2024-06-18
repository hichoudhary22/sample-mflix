"use client";
import { searchMovies } from "@/lib/data";
import { movie } from "@/lib/defination";
import MovieCard from "@/ui/movies/movieCard";
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
  const [searchedMovies, setSearchedMovies] = useState<Array<movie>>();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    // title type genres countries year test
    (async () => {
      const title = searchParams.get("title");
      const type = searchParams.get("type");
      const genres = searchParams.getAll("genres");
      const countries = searchParams.getAll("countries");
      const year = searchParams.getAll("year");
      const sortOrder = formatSortOrder(searchParams.get("sortOrder"));
      const sortBy =
        searchParams.get("Sort By") &&
        formatSortBy(searchParams.get("Sort By"));

      const query = {
        /* ...(title && { title: { $regex: title, $options: "i" } }), */
        ...(title && { $text: { $search: title } }),
        ...(type && { type }),
        ...(genres.length && { genres: { $in: genres } }),
        ...(countries.length && { countries: { $in: countries } }),
        ...(year.length && { year: { $in: year } }),
      };

      const req = {
        query,
        limit: 10,
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      };

      console.log(req);
      console.log("searching");

      const data = await searchMovies(req);
      const mov = JSON.parse(data);
      setSearchedMovies(mov);

      console.log(mov);
      console.log("search complete");
    })();
  }, [searchParams]);

  return (
    <div className="gap-2">
      <SearchPanel searchParams={searchParams} params={params} />
      <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-1">
        {searchedMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie._id.toString()} />
        ))}
      </div>
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

/* 
async function handelSearch() {
    if (
      !title &&
      !type.length &&
      genres.length &&
      countries.length &&
      year.length
    )
      return;

    console.log(params.toString());

    interface query {
      title?: Object;
      type?: Array<string>;
      genres?: Object;
      countries?: Object;
      year?: Object;
    }

    const query: query = {};
    title && (query.title = { $regex: title, $options: "i" });
    type.length && (query.type = type);
    genres.length && (query.genres = { $in: genres });
    countries.length && (query.countries = { $in: countries });
    year.length && (query.year = { $in: year });

    console.log(query);

    const data = await searchMovies({ query, limit: 20 });
    const searchedMovies = await JSON.parse(data);

    setSearchedMovies(searchedMovies);
  }
*/
