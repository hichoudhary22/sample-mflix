"use client";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "@/lib/clientUtils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mongoMovie } from "@/lib/defination";
import { searchMongoMovies } from "@/lib/mongoData";
import SearchPopupMoviesItem from "./searchPopupMoviesItem";

export default function SearchPopup() {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState<mongoMovie[] | []>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const delay = 500;
  async function callback(searchText: string) {
    const query = { title: { $regex: searchText, $options: "i" } };
    const data = await searchMongoMovies({ query, page: 1 });
    const searchedData = await JSON.parse(data);
    setSearchedMovies(searchedData.movies);
  }

  const execSearch = useDebouncedCallback(callback, delay);

  useEffect(() => {
    if (showSearchPanel) execSearch(searchText);
  }, [searchText]);

  function resetSearchPopup() {
    setSearchedMovies([]);
    setSearchText("");
    setShowSearchPanel(false);
  }

  return (
    <>
      <Image
        alt="search icon"
        width={40}
        height={40}
        src={"/search.svg"}
        onClick={() => setShowSearchPanel(true)}
        className="m-1 h-fit self-center rounded-full bg-black p-3"
      />

      {showSearchPanel && (
        <div
          className="fixed left-0 top-0 z-40 h-full w-full backdrop-blur-sm"
          onKeyDown={(e) => {
            if (e.key === "Escape") resetSearchPopup();
            if (e.key === "Enter") {
              resetSearchPopup();
              router.push(
                `/movies/searchMovies?searchedDB=MongoDB&title=${searchText}`,
              );
            }
          }}
          onClick={(e) => {
            if (e.currentTarget === e.target) resetSearchPopup();
          }}
        >
          <div className="mx-auto my-28 max-w-3xl rounded-xl border bg-[rgb(var(--background-rgb))] p-6">
            <div className="flex rounded-full bg-white">
              <input
                type="text"
                className="min-w-6 flex-grow rounded-full px-4 py-2 text-3xl text-black focus:outline-none"
                autoFocus
                onChange={(e) => {
                  if (e.target.value !== null) setSearchText(e.target.value);
                }}
                value={searchText}
              />
              <Link
                href={`/movies/searchMovies?searchedDB=MongoDB&title=${searchText}`}
                className="m-1 rounded-full bg-black px-8 py-1.5 text-2xl text-white"
                onClick={() => resetSearchPopup()}
              >
                Go
              </Link>
            </div>
            <div className="max-h-[400px] overflow-scroll">
              {searchedMovies.length > 0 &&
                searchedMovies?.map((mov) => (
                  <SearchPopupMoviesItem
                    key={mov._id.toString()}
                    mov={mov}
                    setShowSearchPanel={setShowSearchPanel}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
