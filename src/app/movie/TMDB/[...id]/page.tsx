import { getTMDBMovie } from "@/lib/data";
import { TMDBMovie } from "@/lib/defination";
import { readableDate, toHHMM } from "@/lib/utils";
import TextPill from "@/ui/movie/textPill";
import TMDBMovieCard from "@/ui/movies/tmdbMovieCard";
import Image from "next/image";

export default async function TMDBMovieDetailsPage({
  params,
}: {
  params: { id: Array<string> };
}) {
  const response = await getTMDBMovie(params.id[0], params.id[1]);
  const TMDB_Movie: TMDBMovie = JSON.parse(response);
  // console.log(TMDB_Movie.videos.results);
  return (
    <main>
      {/* name, year and runtime */}
      <section className="my-6">
        <h1 className="text-2xl sm:text-4xl">{TMDB_Movie.title}</h1>
        <p>
          {TMDB_Movie.release_date} &#183; {toHHMM(TMDB_Movie.runtime)}
        </p>
      </section>
      {/* poster, geners and overview */}
      <section className="my-4 grid gap-6 sm:grid-cols-[1fr,3fr]">
        <div className="relative aspect-[2/3] min-w-[200px] max-w-[400px]">
          <Image
            src={
              TMDB_Movie.poster_path
                ? `https://image.tmdb.org/t/p/original${TMDB_Movie.poster_path}`
                : "/movie.svg"
            }
            alt="movie poster"
            fill
            sizes="100vw"
            priority={true}
          />
        </div>
        {/* genres */}
        <div>
          {TMDB_Movie.genres?.map((genre) => (
            <TextPill key={genre.id} text={genre.name} />
          ))}
          <p className="overflow-scroll text-ellipsis text-justify">
            {TMDB_Movie.overview}
          </p>
        </div>
      </section>
      {/* ratings, votes and rate this movie */}
      <section className="my-4 text-2xl font-semibold">
        <p>
          <span>{TMDB_Movie.vote_average}/10 &#183;</span>
          <span> {TMDB_Movie.vote_count} votes &#183;</span>
        </p>
      </section>
      {/* production_companies */}
      <section className="my-4">
        <span className="text-xl font-semibold">Production Companies :</span>
        <div className="flex gap-3 overflow-scroll">
          {TMDB_Movie.production_companies?.map((com) => (
            <div key={com.id} className="rounded-sm border p-2">
              <Image
                height={80}
                width={80}
                alt="image icon"
                src={
                  com.logo_path
                    ? `https://image.tmdb.org/t/p/w200/${com.logo_path}`
                    : "/production_company.png"
                }
                style={{
                  height: "60px",
                  maxWidth: "200px",
                  width: "auto",
                  margin: "auto",
                }}
              />
              <hr className="my-1" />
              <p className="whitespace-nowrap text-center text-xs">
                {com.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* cast */}
      <section className="my-4">
        <span className="text-xl font-semibold">Cast :</span>
        <div className="flex gap-3 overflow-scroll">
          {TMDB_Movie.credits.cast?.map((cast) => (
            <div key={cast.id} className="rounded-md border">
              <div className="flex h-[225px] w-[150px] items-center bg-white">
                <Image
                  width={80}
                  height={80}
                  alt="cast profile"
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
                      : "/person.png"
                  }
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "6px 6px 0 0",
                  }}
                />
              </div>
              <p className="border-t p-1 text-sm">
                <span className="block font-bold">{cast.name}</span>
                <span className="line-clamp-2 overflow-scroll font-thin">
                  {cast.character}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="my-4">
          <p className="font-semibold">Production Countries :</p>
          {TMDB_Movie.production_countries?.map((country) => (
            <TextPill key={country.iso_3166_1} text={country.name} />
          ))}
        </div>
        <div className="my-4">
          <p className="font-semibold">Language :</p>
          {TMDB_Movie.spoken_languages?.map((language) => (
            <TextPill key={language.iso_639_1} text={language.english_name} />
          ))}
        </div>
      </section>
      {/* video panel */}
      {TMDB_Movie.videos.results && (
        <section className="flex gap-2 overflow-scroll">
          {TMDB_Movie.videos.results.map((video) => {
            if (video.type === "Trailer")
              return (
                <div key={video.key}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allowFullScreen
                    loading="lazy"
                    className="sm:h-[250px] sm:w-[375px] md:h-[400px] md:w-[600px]"
                    // sandbox="allow-scripts"
                  />
                </div>
              );
          })}
        </section>
      )}
      {/* reviews */}
      <section>
        <p className="font-semibold">Reviews :</p>
        <div className="flex overflow-x-scroll">
          {TMDB_Movie.reviews.results?.map((review) => (
            <div
              key={review.id}
              className="m-1  min-w-[325px]  rounded-md border p-3"
            >
              <p className="my-2 flex justify-between">
                <span className="font-bold">{review.author}</span>
                <span>{readableDate(review.created_at)}</span>
              </p>
              <hr />
              <p className="max-h-[450px] min-h-[150px] overflow-y-scroll text-justify">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <p className="font-semibold">Recommendations :</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-2">
          {TMDB_Movie.recommendations.results?.map((movie) => (
            <TMDBMovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>
    </main>
  );
}