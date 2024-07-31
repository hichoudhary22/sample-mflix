import { mongoMovie, TMDBMovie } from "@/lib/defination";
import { readableDate } from "@/lib/utils";

export default function ReviewsPanel({
  mongoMovie,
  tmdbMovie,
}: {
  mongoMovie?: mongoMovie;
  tmdbMovie?: TMDBMovie;
}) {
  if (tmdbMovie) {
    return <TMDBReviewsPanel TMDB_Movie={tmdbMovie} />;
  } else if (mongoMovie) {
    return <MongoReviewsPanel movie={mongoMovie} />;
  }
}

function TMDBReviewsPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
  return (
    <section>
      <p className="font-semibold">Reviews :</p>
      <div className="flex overflow-x-scroll">
        {TMDB_Movie.reviews?.results?.map((review) => (
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
  );
}

function MongoReviewsPanel({ movie }: { movie: mongoMovie }) {
  return (
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
  );
}
