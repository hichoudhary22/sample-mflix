import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    "Can Search about any movie or series on MongoDB.",
    "Can Search about any movie or series on TMDB.",
    "See details of any particular movie like directors, cast, country, language etc.",
    "We'll suggest related movie based on your search.",
    "Responsive design which makes good UX.",
    "Watch trailers of the movies directly under the details",
  ];
  const sampleImages = [
    "home.png",
    "MongoMovieHomePanel.png",
    "MongoMovieDetailsPage.png",
    "MongoMovieDetailsPage2.png",
    "TMDBMovieCast&MediaPanel.png",
    "searchPopup.png",
    "TMDBCastDetails.png",
    "TMDBMovieDetails.png",
    "TMDBRecommendations.png",
    "TMDBSearchPanel.png",
  ];
  return (
    <main className="h-full w-full">
      <section className="m-auto my-6 text-center sm:w-[50vw]">
        <p>Hello There !</p>
        <p>Welcome to sample_mflix,</p>
        <p>
          I used MongoDB&apos;s sample_mflix database to provide information
          about movies. The information includes cast, poster, year of release,
          director, country etc. But the information and the movies available on
          MongoDB is limited. So I have also used TMDB&apos;s api to include
          newer movies.
        </p>
        <p>Using TMDB&apos;s api also made including trailers possible.</p>
      </section>
      <section className="my-6 sm:flex">
        <div className="p-4 sm:w-[33vw]">
          <p>Features of this app includes :</p>
          {features.map((f, i) => (
            <p key={i}>
              <span className="font-semibold">{i + 1}. </span>
              <span className="font-thin">{f}</span>
            </p>
          ))}
        </div>
        <div className="flex gap-1 overflow-scroll sm:w-[66vw]">
          {sampleImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="sample images"
              height={100}
              width={100}
              style={{
                width: "auto",
                height: "300px",
              }}
            />
          ))}
        </div>
      </section>
      <div className="my-8 flex justify-center">
        <Link
          href={"/movies"}
          className="rounded-full bg-yellow-400 px-20 py-3 text-4xl font-semibold"
        >
          Homepage
        </Link>
      </div>
    </main>
  );
}
