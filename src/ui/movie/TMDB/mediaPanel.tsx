"use client";
import { imgObj, TMDBMovie, vidObj } from "@/lib/defination";
import Image from "next/image";
import { useState } from "react";

export default function MediaPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
  const [mediaType, setMediaType] = useState("Trailer");
  const { backdrops, posters, logos } = TMDB_Movie.images;
  const mediaOptions = [];

  const Trailer = TMDB_Movie.videos.results.filter(
    (video) => video.type === "Trailer",
  );
  const Clip = TMDB_Movie.videos.results.filter(
    (video) => video.type === "Clip",
  );
  const Teaser = TMDB_Movie.videos.results.filter(
    (video) => video.type === "Teaser",
  );

  Trailer.length > 0 && mediaOptions.push("Trailer");
  Clip.length > 0 && mediaOptions.push("Clip");
  Teaser.length > 0 && mediaOptions.push("Teaser");
  backdrops.length > 0 && mediaOptions.push("backdrops");
  posters.length > 0 && mediaOptions.push("posters");
  logos.length > 0 && mediaOptions.push("logos");
  return (
    <section>
      <p className="font-semibold">Media :</p>
      <div className="rounded-md border p-4">
        <div className="m-2 flex gap-2">
          {mediaOptions.map((option) => (
            <button
              className={`rounded-full border px-4 py-1 capitalize ${mediaType === option && "bg-yellow-400"}`}
              onClick={() => setMediaType(option)}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-scroll">
          {mediaType === "Trailer" && Trailer.map(displayVideo)}
          {mediaType === "Clip" && Clip.map(displayVideo)}
          {mediaType === "Teaser" && Teaser.map(displayVideo)}
          {mediaType === "backdrops" && backdrops.map(displayImage)}
          {mediaType === "posters" && posters.map(displayImage)}
          {mediaType === "logos" && logos.map(displayImage)}
        </div>
      </div>
    </section>
  );
}

const displayImage = (imgObj: imgObj) => (
  <Image
    src={`https://image.tmdb.org/t/p/original/${imgObj.file_path}`}
    key={imgObj.file_path}
    alt="image"
    height={100}
    width={100}
    style={{
      height: `${imgObj.height}`,
      aspectRatio: `${imgObj.aspect_ratio}`,
      width: "auto",
      maxHeight: "300px",
    }}
  />
);

const displayVideo = (video: vidObj) => {
  return (
    <div key={video.key}>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        loading="lazy"
        className="sm:h-[250px] sm:w-[375px] md:h-[400px] md:w-[600px]"
        // sandbox="allow-scripts"
        allow="fullscreen"
      ></iframe>
    </div>
  );
};
