import { TMDBMovie } from "@/lib/defination";
import { toHHMM } from "@/lib/utils";
import Image from "next/image";
import TextPill from "../textPill";

export default function PosterPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
  return (
    <main
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
        </div>
        {/* movie details */}
        <div className="sm:w-2/3">
          <h1 className="text-2xl sm:text-4xl">{TMDB_Movie.title}</h1>
          <p>
            {TMDB_Movie.release_date} &#183; {toHHMM(TMDB_Movie.runtime)}
          </p>
          {TMDB_Movie.genres?.map((genre) => (
            <TextPill key={genre.id} text={genre.name} />
          ))}
          <p className="max-h-[100px] overflow-scroll text-ellipsis text-justify">
            {TMDB_Movie.overview}
          </p>
          <p>
            <span>{TMDB_Movie.vote_average}/10 &#183;</span>
            <span> {TMDB_Movie.vote_count} votes &#183;</span>
          </p>
          <p className="font-semibold">Production Countries :</p>
          {TMDB_Movie.production_countries?.map((country) => (
            <TextPill key={country.iso_3166_1} text={country.name} />
          ))}
          <p className="font-semibold">Language :</p>
          {TMDB_Movie.spoken_languages?.map((language) => (
            <TextPill key={language.iso_639_1} text={language.english_name} />
          ))}
        </div>
      </section>
    </main>
  );
}
