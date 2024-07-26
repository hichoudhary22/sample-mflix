import { TMDBMovie } from "@/lib/defination";
import Image from "next/image";

export default function ProductionCompaniesPanel({
  TMDB_Movie,
}: {
  TMDB_Movie: TMDBMovie;
}) {
  return (
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
            <p className="whitespace-nowrap text-center text-xs">{com.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
