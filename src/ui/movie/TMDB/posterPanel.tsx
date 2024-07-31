import TextPill from "../textPill";
import Link from "next/link";
import ImageWithFallback from "@/ui/app/imgWithFallback";
import { mongoMovie, TMDBMovie } from "@/lib/defination";
import { readableDate, toHHMM } from "@/lib/utils";

export default function PosterPanel({
  mongoMovie,
  tmdbMovie,
}: {
  mongoMovie?: mongoMovie;
  tmdbMovie?: TMDBMovie;
}) {
  if (tmdbMovie) {
    return <TMDBPosterPanel movie={tmdbMovie} />;
  } else if (mongoMovie) {
    return <MongoPosterPanel movie={mongoMovie} />;
  }
}

function MongoPosterPanel({ movie }: { movie: mongoMovie }) {
  return (
    <section
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
      }}
      className={`bg-cover bg-center text-white bg-blend-multiply ${movie.backdrop_path && "bg-slate-500"}`}
    >
      {/* movie poster and details */}
      <section className="flex flex-col gap-6 p-4 sm:flex-row">
        {/* movie poster */}
        <div className="w-1/2 self-center sm:w-1/3">
          <ImageWithFallback
            src={movie.poster}
            fallback={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie poster"
            width={10}
            height={10}
            priority={true}
            className="w-auto"
          />
          <p className="border-t text-center">{movie.awards.text}</p>
        </div>
        {/* movie details */}
        <div className="sm:w-2/3">
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-4xl">{movie.title}</h1>
            {movie.id && (
              <Link href={`/movie/TMDB/${movie.type}/${movie.id}`}>
                <div className="rounded-bl-full bg-yellow-400 py-3 ps-2">
                  <p className="text-end leading-[0.75] underline">TMDB</p>
                  <p className="text-end text-xs font-thin leading-[0.75]">
                    page
                  </p>
                </div>
              </Link>
            )}
          </div>
          <p>
            {movie.released && readableDate(movie.released.toString())} &#183;{" "}
            {movie.runtime && toHHMM(movie.runtime)}
          </p>
          <p>
            <span>{movie.imdb.rating?.toFixed(1)}/10 &#183;</span>
            <span> {movie.imdb.votes} votes</span>
          </p>
          {movie.genres?.map((genre) => <TextPill key={genre} text={genre} />)}
          {movie.tomatoes?.website && (
            <Link href={movie.tomatoes.website} className="font-semibold">
              <p>Website</p>
            </Link>
          )}
          <p className="max-h-[100px] overflow-scroll text-ellipsis text-justify">
            {movie.fullplot}
          </p>
          {movie.cast && (
            <TabularDetails
              firstString="Cast"
              secondString={movie.cast.join(", ")}
            />
          )}
          {movie.countries && (
            <TabularDetails
              firstString="Countries"
              secondString={movie.countries.join(", ")}
            />
          )}
          {movie.languages && (
            <TabularDetails
              firstString="Languages"
              secondString={movie.languages.join(", ")}
            />
          )}
          {movie.writers && (
            <TabularDetails
              firstString="Writers"
              secondString={movie.writers.join(", ")}
            />
          )}
          {movie.directors && (
            <TabularDetails
              firstString="Directors"
              secondString={movie.directors.join(", ")}
            />
          )}
        </div>
      </section>
    </section>
  );
}

function TabularDetails({
  firstString,
  secondString,
}: {
  firstString: string;
  secondString: string;
}) {
  return (
    <div className="grid grid-cols-[2fr,1fr,8fr]">
      <p className="font-semibold">{firstString}</p>
      <p className="mx-2 font-semibold">:</p>
      <p className="font-normal">{secondString}.</p>
    </div>
  );
}

function TMDBPosterPanel({ movie }: { movie: TMDBMovie }) {
  return (
    <section
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
      }}
      className={`bg-slate-500 bg-cover bg-center text-white bg-blend-multiply`}
    >
      {/* movie poster and details */}
      <section className="flex flex-col gap-6 p-4 sm:flex-row">
        {/* movie poster */}
        <div className="w-1/2 self-center sm:w-1/3">
          <ImageWithFallback
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            fallback="/movie.svg"
            alt="movie poster"
            width={10}
            height={10}
            priority={true}
            className="w-auto"
          />
          <p className="border-t text-center uppercase">{movie.tagline}</p>
        </div>
        {/* movie details */}
        <div className="sm:w-2/3">
          <h1 className="text-2xl sm:text-4xl">{movie.title || movie.name}</h1>
          <p>
            {movie.release_date} &#183; {movie.runtime && toHHMM(movie.runtime)}
          </p>
          <p>
            <span>{movie.vote_average?.toFixed(1)}/10 &#183;</span>
            <span> {movie.vote_count} votes</span>
          </p>
          {movie.genres?.map((genre) => (
            <TextPill key={genre.id} text={genre.name} />
          ))}

          {movie.homepage && (
            <Link href={movie.homepage} className="font-semibold">
              <p>Website</p>
            </Link>
          )}
          <p className="max-h-[100px] overflow-scroll text-ellipsis text-justify">
            {movie.overview}
          </p>
          <div className="grid grid-cols-[1fr,1fr,8fr]">
            <p className="font-semibold">Countries</p>
            <p className="mx-2 font-semibold">:</p>
            <p className="font-normal">
              {movie.production_countries?.reduce(
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
              {movie.spoken_languages?.reduce(
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
            <p>$ {movie.budget || "Not Available"} </p>
            <p className="font-semibold">Revenue</p> <p>:</p>
            <p>$ {movie.revenue || "Not Available"}</p>
          </div>
        </div>
      </section>
    </section>
  );
}
