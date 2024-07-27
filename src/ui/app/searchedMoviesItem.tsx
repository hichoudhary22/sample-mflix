import Image from "next/image";
import Link from "next/link";
import TextPill from "../movie/textPill";
import { mongoMovie } from "@/lib/defination";

export default function SearchedMoviesItem({
  mov,
  setShowSearchPanel,
}: {
  mov: mongoMovie;
  setShowSearchPanel: Function;
}) {
  return (
    mov.poster && (
      <Link href={`/movie/mongoDB/${mov._id}`}>
        <div
          className="my-2 flex rounded-md border bg-[rgb(var(--background-rgb))]"
          onClick={() => setShowSearchPanel(false)}
        >
          <div className="relative aspect-[2/3] min-w-[120px]">
            <Image
              src={mov.poster}
              alt="movie poster"
              sizes="20vw"
              fill
              style={{ borderRadius: "6px" }}
            />
          </div>
          <div className="m-2 w-full">
            <div className="flex flex-grow justify-between">
              <p className="line-clamp-1 overflow-ellipsis text-xl font-semibold">
                {mov.title}
              </p>
              <p>{mov.year}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <p>IMDb : {mov.imdb?.rating}/10</p>
              {mov.tomatoes && <p>Rotten : {mov?.tomatoes.viewer.rating}</p>}
            </div>
            <div className="flex gap-2">
              {mov.genres?.map((g) => <TextPill text={g} key={g} />)}
            </div>
            <p className="line-clamp-3 text-sm">{mov.plot}</p>
          </div>
        </div>
      </Link>
    )
  );
}
