import { getMovie } from "@/lib/data";
import { movie } from "@/lib/defination";
import { readableDate, toHHMM } from "@/lib/utils";
import TextPill from "@/ui/movie/textPill";
import MovieCard from "@/ui/movies/movieCard";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function Movie({ params }: { params: { id: ObjectId } }) {
  const id = params.id;
  const response = await getMovie(id);
  const movie: movie = JSON.parse(response);

  if (!movie) {
    console.log(movie);
    return <div>no movie found</div>;
  }

  return (
    <main>
      {/* name, year and runtime */}
      <section>
        <div className="my-6">
          <h1 className="text-2xl sm:text-4xl">{movie.title}</h1>
          <p>
            {movie.year} &#183; {toHHMM(movie.runtime)}
          </p>
        </div>
      </section>
      {/* photo, geners and full plot */}
      <section className="my-4 grid gap-6 sm:grid-cols-[1fr,3fr]">
        <div className="relative aspect-[2/3] min-w-[200px] max-w-[400px]">
          <Image src={movie.poster} alt="movie poster" fill sizes="100vw" />
        </div>
        {/* genres & full-plot */}
        <div>
          {movie.genres?.map((genre) => <TextPill text={genre} key={genre} />)}
          <p className="overflow-y-scroll text-ellipsis text-justify">
            {movie.fullplot}
          </p>
        </div>
      </section>
      {/* ratings and votes */}
      <section className="my-4 text-2xl font-semibold">
        <p>
          <span>{movie.imdb.rating}/10 &#183;</span>
          <span> {movie.imdb.votes} votes</span>
        </p>
      </section>
      {/* info about directors writers cast and language */}
      <section>
        <div>
          <p className="text-xl font-semibold underline">Directors :</p>
          {movie.directors?.map((director) => (
            <TextPill key={director} text={director} />
          ))}
        </div>
        <div>
          <p className="text-xl font-semibold underline">Writers :</p>
          {movie.writers?.map((writer) => (
            <TextPill key={writer} text={writer} />
          ))}
        </div>
        <div>
          <p className="text-xl font-semibold underline">Cast :</p>
          {movie.cast?.map((cast) => <TextPill key={cast} text={cast} />)}
        </div>
        <div>
          <p className="text-xl font-semibold underline">Language :</p>
          {movie.languages?.map((language) => (
            <TextPill key={language} text={language} />
          ))}
        </div>
      </section>
      {/* reviews */}
      <section>
        <p className="font-semibold">Reviews :</p>
        <div className="flex overflow-x-scroll">
          {movie.comments?.map((comment) => (
            <div
              key={comment._id}
              className="m-1  min-w-[325px]  rounded-md border p-3"
            >
              <p className="my-2 flex justify-between">
                <span className="font-bold">{comment.name}</span>
                <span>{readableDate(comment.date.toString())}</span>
              </p>
              <hr />
              <p className="max-h-[450px] min-h-[150px] overflow-y-scroll text-justify">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Recommendations */}
      <section>
        <p className="text-xl font-semibold underline">Recommendations :</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] gap-2">
          {movie.recommendations?.map((mov) => (
            <MovieCard movie={mov} key={mov._id.toString()} />
          ))}
        </div>
      </section>
    </main>
  );
}
