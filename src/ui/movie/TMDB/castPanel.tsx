import { TMDBMovie } from "@/lib/defination";
import Image from "next/image";

export default function CastPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
  return (
    <section className="my-4">
      <span className="text-xl font-semibold">Cast :</span>
      <div className="flex gap-3 overflow-scroll">
        {TMDB_Movie.credits.cast?.map((cast) => (
          <div key={cast.id} className="rounded-md border">
            <div className="flex h-[225px] w-[150px] items-center rounded-md bg-white">
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
  );
}
