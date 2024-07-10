"use client";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useState } from "react";
import DropDown from "./dropDown";
import UniqueSelectDropDown from "./uniqueSelectDropDown";
import Image from "next/image";
import ascending from "../../../public/ascending.svg";
import descending from "../../../public/descending.svg";
import SelectDB from "./selectDB";

export default function SearchPanel({
  searchParams,
  params,
}: {
  searchParams: ReadonlyURLSearchParams;
  params: URLSearchParams;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const [searchedDB, setSearchedDB] = useState(
    searchParams.get("searchedDB") || "MongoDB",
  );

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [genres, setGenres] = useState(searchParams.getAll("genres") || [""]);
  const [countries, setCountries] = useState(
    searchParams.getAll("countries") || [""],
  );
  const [year, setYear] = useState(searchParams.getAll("year") || [""]);
  const [sortBy, setSortBy] = useState(searchParams.get("Sort By") || "");
  const [sortOrder, setSortOrder] = useState(true);

  const valOfType = ["movie", "series"];
  const valOfGenres = [
    "Action",
    "Adult",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Costume",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Game-Show",
    "History",
    "Horror",
    "Kungfu",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk",
    "Talk-Show",
    "Thriller",
    "TV Movie",
    "TV Show",
    "War",
    "Western",
  ];
  const valOfCountries = [
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Czech Republic",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Hong Kong",
    "Hungary",
    "India",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Philippines",
    "Poland",
    "Romania",
    "Russia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "United Kingdom",
    "United States",
  ];
  const valOfYear = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2000s",
    "1990s",
    "1980s",
    "1970s",
    "1960s",
    "1950s",
    "1940s",
    "1930s",
    "1920s",
    "1910s",
  ];
  const valOfSortBy = [
    "Year",
    "Tomatoes Viewer Rating",
    "Tomatoes Critic Rating",
    "IMDb Rating",
  ];

  function goToSearchPage() {
    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <>
      <div className="m-auto flex max-w-[800px] flex-wrap gap-2">
        <div className=" flex w-full  rounded-full bg-white">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              params.set("title", e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                params.set("page", "1");
                goToSearchPage();
              }
            }}
            className="w-full rounded-full px-3 py-1 text-2xl text-black focus:outline-none"
            placeholder="Enter Title"
          />
          <button
            className="m-1 w-fit rounded-full bg-yellow-400 px-3 py-1 text-xl"
            onClick={() => {
              params.set("page", "1");
              goToSearchPage();
            }}
          >
            Search
          </button>
        </div>

        <div className="m-auto rounded-sm border p-2">
          <SelectDB
            searchedDB={searchedDB}
            params={params}
            setSearchedDB={setSearchedDB}
            goToSearchPage={goToSearchPage}
          />

          {searchedDB === "MongoDB" && (
            <div className="my-1 flex flex-wrap">
              <UniqueSelectDropDown
                name="type"
                options={valOfType}
                selectedOption={type}
                setSelectedOption={setType}
                params={params}
              />
              <DropDown
                name="genres"
                options={valOfGenres}
                selectedOptions={genres}
                setSelectedOptions={setGenres}
                params={params}
              />
              <DropDown
                name="countries"
                options={valOfCountries}
                selectedOptions={countries}
                setSelectedOptions={setCountries}
                params={params}
              />
              <DropDown
                name="year"
                options={valOfYear}
                selectedOptions={year}
                setSelectedOptions={setYear}
                params={params}
              />
              <UniqueSelectDropDown
                name="Sort By"
                options={valOfSortBy}
                selectedOption={sortBy}
                setSelectedOption={setSortBy}
                params={params}
              />
              <button
                className="flex gap-2 rounded-full border px-5 py-1"
                onClick={() => {
                  setSortOrder((bool) => !bool);
                  if (sortOrder) params.set("sortOrder", "ascending");
                  else params.set("sortOrder", "descending");
                }}
              >
                <Image
                  width={20}
                  height={20}
                  src={sortOrder ? ascending : descending}
                  alt="ascending or descending"
                />
                {sortOrder ? "Descending" : "Ascending"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
