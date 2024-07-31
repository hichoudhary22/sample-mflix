"use server";
import fetch from "node-fetch";
const TMDBAuthorization = process.env.TMDB_AUTHORIZATION as string;

export async function searchTMDB(
  query: string,
  page: number,
  queryType: string,
) {
  const url = `https://api.themoviedb.org/3/search/${queryType}?query=${query}&include_adult=false&page=${page}&sort_by=primary_release_date.asc`;
  // const url = `https://api.themoviedb.org/3/discover/movie?query=${query}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
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

export async function getTMDBMovie(type: string, id: string) {
  const url = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=images%2Cvideos%2Ccredits%2Creviews%2Crecommendations&language=en-US%2Cnull%2Cen`;
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

export async function getTMDBId(ImdbId: number) {
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
