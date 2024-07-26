import { TMDBMovie } from "@/lib/defination";
import { toHHMM } from "@/lib/utils";
import Image from "next/image";
import TextPill from "../textPill";
import Link from "next/link";

export default function PosterPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
  return (
    <section
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${TMDB_Movie.backdrop_path})`,
      }}
      className={`bg-slate-500 bg-cover bg-center text-white bg-blend-multiply`}
    >
      {/* movie poster and details */}
      <section className="flex flex-col gap-6 p-4 sm:flex-row">
        {/* movie poster */}
        <div className="w-1/2 self-center sm:w-1/3">
          <Image
            src={
              TMDB_Movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${TMDB_Movie.poster_path}`
                : "/movie.svg"
            }
            alt="movie poster"
            width={10}
            height={10}
            priority={true}
            className="w-auto"
          />
          <p className="border-t text-center uppercase">{TMDB_Movie.tagline}</p>
        </div>
        {/* movie details */}
        <div className="sm:w-2/3">
          <h1 className="text-2xl sm:text-4xl">
            {TMDB_Movie.title || TMDB_Movie.name}
          </h1>
          <p>
            {TMDB_Movie.release_date || TMDB_Movie.first_air_date} &#183;{" "}
            {TMDB_Movie.runtime && toHHMM(TMDB_Movie.runtime)}
          </p>
          <p>
            <span>{TMDB_Movie.vote_average.toFixed(1)}/10 &#183;</span>
            <span> {TMDB_Movie.vote_count} votes</span>
          </p>
          {TMDB_Movie.genres?.map((genre) => (
            <TextPill key={genre.id} text={genre.name} />
          ))}

          {TMDB_Movie.homepage && (
            <Link href={TMDB_Movie.homepage} className="font-semibold">
              <p>Website</p>
            </Link>
          )}
          <p className="max-h-[100px] overflow-scroll text-ellipsis text-justify">
            {TMDB_Movie.overview}
          </p>
          <div className="grid grid-cols-[1fr,1fr,8fr]">
            <p className="font-semibold">Countries</p>
            <p className="mx-2 font-semibold">:</p>
            <p className="font-normal">
              {TMDB_Movie.production_countries.reduce(
                (accumulator, countryObj) =>
                  accumulator
                    ? accumulator + ", " + countryObj.name
                    : countryObj.name,
                "",
              )}
              .
            </p>
            <p className="font-semibold">Languages</p>
            <p className="mx-2 font-semibold">:</p>
            <p className="font-normal">
              {TMDB_Movie.spoken_languages.reduce(
                (accumulator, langObj) =>
                  accumulator
                    ? accumulator + ", " + langObj.english_name
                    : langObj.english_name,
                "",
              )}
              .
            </p>
            <p className="font-semibold">Budget</p>{" "}
            <p className="mx-2 font-semibold">:</p>{" "}
            <p>$ {TMDB_Movie.budget || "Not Available"} </p>
            <p className="font-semibold">Revenue</p> <p>:</p>
            <p>$ {TMDB_Movie.revenue || "Not Available"}</p>
          </div>
        </div>
      </section>
    </section>
  );
}
