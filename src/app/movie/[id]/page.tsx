import { getComments, getMovie } from "@/lib/data";
import { toHHMM } from "@/lib/utils";
import CommentsPannel from "@/ui/movie/commentsPanel";
import GenerePill from "@/ui/movie/generePill";
import RelatedMovies from "@/ui/movie/related";
import QueryElement from "@/ui/queryElement";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function Movie({ params }: { params: { id: ObjectId } }) {
  const id = params.id;
  const movie = await getMovie(id);
  const comments = await getComments(id);

  if (!movie) {
    console.log(movie);
    return <div>no movie found</div>;
  }

  return (
    <div>
      {/* name, year and runtime */}
      <div>
        <div className="my-6">
          <h1 className="text-4xl">{movie.title}</h1>
          <p>
            {movie.year} &#183; {toHHMM(movie.runtime)}
          </p>
        </div>
      </div>
      {/* photo, geners and full plot */}
      <div className="my-4 grid gap-6 sm:grid-cols-[1fr,3fr]">
        <div className="relative aspect-[2/3] min-w-[200px] max-w-[400px]">
          <Image src={movie.poster} alt="movie poster" fill sizes="100vw" />
        </div>
        <div>
          <div className="my-4 flex flex-wrap gap-2">
            {movie.genres?.map((g) => <GenerePill g={g} key={g} />)}
          </div>
          <p className="overflow-hidden text-ellipsis text-justify">
            {movie.fullplot}
          </p>
        </div>
      </div>
      {/* ratings, votes and rate this movie */}
      <div className="my-4 text-2xl font-semibold">
        <p>
          <span>{movie.imdb.rating}/10 &#183;</span>
          <span> {movie.imdb.votes} votes &#183;</span>
          <span> Rate this movie</span>
        </p>
      </div>
      {/* info about directors writers cast and language */}
      <div className="text-2xl">
        <p className="my-4">
          <span className="font-semibold">Directors </span>
          {movie.directors?.map((d) => (
            <QueryElement key={d} k="directors" val={d} />
          ))}
        </p>
        <p className="my-4">
          <span className="font-semibold">Writers </span>
          {movie.writers?.map((w) => (
            <QueryElement key={w} k="writers" val={w} />
          ))}
        </p>
        <p className="my-4">
          <span className="font-semibold">Cast </span>
          {movie.cast?.map((c) => <QueryElement key={c} k="cast" val={c} />)}
        </p>
        <p className="my-4">
          <span className="font-semibold">Language </span>
          {movie.languages.map((l) => (
            <QueryElement key={l} k="language" val={l} />
          ))}
        </p>
      </div>
      {/* add this movie to your watchlist */}
      <button>
        <p>+</p>
        <div>
          <p>add to watch list</p>
        </div>
      </button>
      {/* movie reviews and number of comments */}
      <div className="flex">
        <div className="flex flex-col items-center p-2">
          <p>{movie.metacritic}</p>
          <p>Meta Critic</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <p>{movie.num_mflix_comments}</p>
          <p>mflix comments</p>
        </div>
      </div>
      {/* comments */}
      {comments?.map((comment) => (
        <CommentsPannel comment={comment} key={comment._id} />
      ))}
      {/* finding similar movies */}
      <RelatedMovies movie={movie} />
    </div>
  );
}
