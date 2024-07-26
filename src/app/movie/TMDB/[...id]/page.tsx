import { getTMDBMovie } from "@/lib/data";
import { TMDBMovie } from "@/lib/defination";
import CastPanel from "@/ui/movie/TMDB/castPanel";
import MediaPanel from "@/ui/movie/TMDB/mediaPanel";
import PosterPanel from "@/ui/movie/TMDB/posterPanel";
import ProductionCompaniesPanel from "@/ui/movie/TMDB/productionCompaniesPanel";
import RecommendationsPanel from "@/ui/movie/TMDB/recommendationsPanel";
import ReviewsPanel from "@/ui/movie/TMDB/reviewsPanel";
import SeasonsPanel from "@/ui/movie/TMDB/seasonsPanel";

export default async function TMDBMovieDetailsPage({
  params,
}: {
  params: { id: Array<string> };
}) {
  const response = await getTMDBMovie(params.id[0], params.id[1]);
  const TMDB_Movie: TMDBMovie = JSON.parse(response);
  return (
    <main>
      <PosterPanel TMDB_Movie={TMDB_Movie} />
      {TMDB_Movie.seasons && <SeasonsPanel TMDB_Movie={TMDB_Movie} />}
      <ProductionCompaniesPanel TMDB_Movie={TMDB_Movie} />
      <CastPanel TMDB_Movie={TMDB_Movie} />
      <MediaPanel TMDB_Movie={TMDB_Movie} />
      <ReviewsPanel TMDB_Movie={TMDB_Movie} />
      <RecommendationsPanel TMDB_Movie={TMDB_Movie} />
    </main>
  );
}
