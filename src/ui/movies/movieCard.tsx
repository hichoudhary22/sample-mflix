import { movie } from "@/lib/defination";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: movie }) {
  // const movie: movie = JSON.parse(mov);
  return (
    <Link href={`/movie/mongoDB/${movie._id}`}>
      <div className="relative aspect-[2/3] min-w-[150px] max-w-[230px] transition-all hover:z-10 hover:scale-110">
        <Image
          fill
          priority={false}
          src={movie.poster ? movie.poster : "/movie.svg"}
          alt="movie image"
          sizes="40vw"
          style={{
            borderRadius: "6px",
            filter: "brightness(.80)",
          }}
        />
        <h1 className="absolute bottom-0 mx-1 text-white">{movie.title}</h1>
      </div>
    </Link>
  );
}
