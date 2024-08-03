import { mongoMovie } from "@/lib/defination";
import { getMongoMovie } from "@/lib/mongoData";
import PosterPanel from "@/ui/movie/TMDB/posterPanel";
import RecommendationsPanel from "@/ui/movie/TMDB/recommendationsPanel";
import ReviewsPanel from "@/ui/movie/TMDB/reviewsPanel";
import { ObjectId } from "mongodb";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Movie({ params }: { params: { id: ObjectId } }) {
  const id = params.id;
  const response = await getMongoMovie(id);
  const movie: mongoMovie = JSON.parse(response);
  if (!movie) {
    console.log(movie);
    return <div>no movie found</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <main>
        <PosterPanel mongoMovie={movie} />
        {movie.comments.length > 0 && <ReviewsPanel mongoMovie={movie} />}
        <RecommendationsPanel mongoMovie={movie} />
      </main>
    </Suspense>
  );
}
