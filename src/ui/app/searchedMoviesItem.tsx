import { movie } from "@/lib/defination";
import Image from "next/image";
import Link from "next/link";
import GenerePill from "../movie/generePill";
import movieSvg from "../../../public/movie.svg";

export default function SearchedMoviesItem({
  mov,
  setShowSearchPanel,
}: {
  mov: movie;
  setShowSearchPanel: Function;
}) {
  return (
    mov.poster && (
      <Link href={`/movie/${mov._id}`}>
        <div
          className="my-2 flex rounded-md border bg-[rgb(var(--background-rgb))]"
          onClick={() => setShowSearchPanel(false)}
        >
          <div className="relative aspect-[2/3] w-[120px]">
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
              {mov.genres?.map((g) => <GenerePill g={g} key={g} sm={true} />)}
            </div>
            <p className="line-clamp-3 text-sm">{mov.plot}</p>
          </div>
        </div>
      </Link>
    )
  );
}
