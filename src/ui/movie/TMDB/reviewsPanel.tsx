import { TMDBMovie } from "@/lib/defination";
import { readableDate } from "@/lib/utils";

export default function ReviewsPanel({
  TMDB_Movie,
}: {
  TMDB_Movie: TMDBMovie;
}) {
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
