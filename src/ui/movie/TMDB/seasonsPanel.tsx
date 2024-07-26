import { TMDBMovie } from "@/lib/defination";
import Image from "next/image";

export default function SeasonsPanel({
  TMDB_Movie,
}: {
  TMDB_Movie: TMDBMovie;
}) {
  console.log(TMDB_Movie.seasons);
  return (
    <section className="my-4">
      <span className="text-xl font-semibold">Seasons :</span>
      <div className="flex gap-3 overflow-scroll">
        {TMDB_Movie.seasons?.map((season) => (
          <div key={season.id} className="rounded-md">
            <div className="flex h-[225px] w-[150px] items-center rounded-md">
              <Image
                width={80}
                height={80}
                alt="season poster"
                src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`}
                style={{
                  width: "150px",
                  height: "auto",
                  borderRadius: "6px 6px 0 0",
                }}
              />
            </div>
            <p className="border-t p-1 text-sm">
              <span className="block font-bold">{season.name}</span>
              <span className="line-clamp-2 overflow-scroll font-thin">
                {season.episode_count}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
