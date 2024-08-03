import { TMDBMovie } from "@/lib/defination";
import { getTMDBMovie } from "@/lib/tmdbData";
import CastPanel from "@/ui/movie/TMDB/castPanel";
import MediaPanel from "@/ui/movie/TMDB/mediaPanel";
import PosterPanel from "@/ui/movie/TMDB/posterPanel";
import ProductionCompaniesPanel from "@/ui/movie/TMDB/productionCompaniesPanel";
import RecommendationsPanel from "@/ui/movie/TMDB/recommendationsPanel";
import ReviewsPanel from "@/ui/movie/TMDB/reviewsPanel";
import SeasonsPanel from "@/ui/movie/TMDB/seasonsPanel";
import { Suspense } from "react";
import Loading from "./loading";

export default async function TMDBMovieDetailsPage({
  params,
}: {
  params: { id: Array<string> };
}) {
  const response = await getTMDBMovie(params.id[0], params.id[1]);
  const TMDB_Movie: TMDBMovie = JSON.parse(response);
  if (TMDB_Movie.success === false)
    return (
      <div className="text-center">
        <p className="text-4xl uppercase">404 not found</p>
        <p>{TMDB_Movie.status_message}</p>
        <p>Status Code :{TMDB_Movie.status_code}</p>
      </div>
    );
  return (
    <Suspense fallback={<Loading />}>
      <main>
        <PosterPanel tmdbMovie={TMDB_Movie} />
        {TMDB_Movie.seasons && <SeasonsPanel TMDB_Movie={TMDB_Movie} />}
        <ProductionCompaniesPanel TMDB_Movie={TMDB_Movie} />
        <CastPanel TMDB_Movie={TMDB_Movie} />
        <MediaPanel TMDB_Movie={TMDB_Movie} />
        <ReviewsPanel tmdbMovie={TMDB_Movie} />
        <RecommendationsPanel TMDB_Movie={TMDB_Movie} />
      </main>
    </Suspense>
  );
}
