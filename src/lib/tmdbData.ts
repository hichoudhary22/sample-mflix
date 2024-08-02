"use server";
import fetch from "node-fetch";

export async function getTMDBId(ImdbId: number) {
  const TMDBAuthorization = process.env.TMDB_AUTHORIZATION as string;
  const id = String(ImdbId).padStart(7, "0");
  const url = `https://api.themoviedb.org/3/find/tt${id}?external_source=imdb_id`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDBAuthorization,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data?.movie_results[0];
}

async function getTMDBUrl(url: string) {
  const TMDBAuthorization = process.env.TMDB_AUTHORIZATION as string;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDBAuthorization,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return JSON.stringify(data);
}

export async function searchTMDB(
  query: string,
  page: number,
  queryType: string,
) {
  return await getTMDBUrl(
    `https://api.themoviedb.org/3/search/${queryType}?query=${query}&include_adult=false&page=${page}&sort_by=primary_release_date.asc`,
  );
  // const url = `https://api.themoviedb.org/3/discover/movie?query=${query}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
}

export async function getTMDBMovie(type: string, id: string) {
  return await getTMDBUrl(
    `https://api.themoviedb.org/3/${type}/${id}?append_to_response=images%2Cvideos%2Ccredits%2Creviews%2Crecommendations&language=en-US%2Cnull%2Cen`,
  );
}

export async function getPopularTMDBMovies() {
  return await getTMDBUrl(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=in",
  );
}

export async function getNowPlayingTMDBMovies() {
  return await getTMDBUrl(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=in",
  );
}
export async function getTopRatedTMDBMovies() {
  return await getTMDBUrl(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=in",
  );
}
export async function getUpcomingTMDBMovies() {
  return await getTMDBUrl(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=in",
  );
}
