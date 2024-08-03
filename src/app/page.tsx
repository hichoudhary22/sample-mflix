import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    "Can Search about any movie or series on MongoDB.",
    "Can Search about any movie or series on TMDB.",
    "See details of any particular movie like directors, cast, country, language etc.",
    "We'll suggest related movie based on your search.",
    "Responsive design which makes good UX.",
  ];
  const sampleImages = [
    "Homepage.png",
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
        <p>
          Welcome to sample_mflix, let me tell you about this project, this
          project started as a e-commerce-app. But soon I realised that there
          were not much data available for me to properly make a good E-Commerce
          website.
        </p>
        <p>
          I even used faker api to make fake data and products, but it was not
          very useful. Then I found sample Database in my mongoDB account and
          decided to use it.
        </p>
        <p>But halfway through I realised that it too was not enough...</p>
        <p>So I also tapped into TMDB.</p>
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
          Enter
        </Link>
      </div>
    </main>
  );
}
