"use client";
import { TMDBMovie } from "@/lib/defination";
import { useState } from "react";

export default function MediaPanel({ TMDB_Movie }: { TMDB_Movie: TMDBMovie }) {
  const [media, setMedia] = useState("Trailer");
  const mediaOptions = ["Trailer", "Clip", "Teaser"];
  return (
    <section>
      <p className="font-semibold">Media :</p>
      <div className="rounded-md border p-4">
        <div className="m-2 flex gap-2">
          {mediaOptions.map((option) => (
            <button
              className={`rounded-full border px-4 py-1 ${media === option && "bg-yellow-400"}`}
              onClick={() => setMedia(option)}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-scroll">
          {TMDB_Movie.videos.results.map((video) => {
            if (video.type === media)
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
          })}
        </div>
      </div>
    </section>
  );
}
