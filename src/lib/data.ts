"use server";
import connectionPromise from "@/lib/mongodb";
import { MongoClient, ObjectId, WithId } from "mongodb";
import { movie, comment } from "./defination";
import fetch from "node-fetch";

const TMDBAuthorization = process.env.TMDB_AUTHORIZATION as string;

export async function getAllMovies(
  query: { [key: string]: string },
  limit?: number,
) {
  const connection = await connectionPromise;
  const collection = connection.db("sample_mflix").collection<movie>("movies");
  const movies = await collection
    .find(query)
    .sort({ released: -1 })
    .limit(limit || 50)
    .project<movie>({
      _id: 1,
      title: 1,
      poster: 1,
      imdb: 1,
      released: 1,
      runtime: 1,
      year: 1,
      fullplot: 1,
    })
    .toArray();
  return movies;
}

export async function getMovie(id: ObjectId) {
  const connection = await connectionPromise;

  const movieCollection = connection
    .db("sample_mflix")
    .collection<movie>("movies");
  const movie = await movieCollection.findOne<movie>({ _id: new ObjectId(id) });

  const commentsCollection = connection
    .db("sample_mflix")
    .collection("comments");
  const comments = await commentsCollection
    .find<comment>({ movie_id: new ObjectId(id) })
    .sort({ date: -1 })
    .limit(10)
    .project<comment>({ name: 1, text: 1, date: 1 })
    .toArray();

  if (!movie) return JSON.stringify({ error: 404, message: "no movie found" });
  const relatedMovies = await getRelatedMovies(connection, movie);
  const tmdbId = await getTMDBId(movie.imdb.id);
  const data: movie = {
    ...movie,
    comments,
    recommendations: relatedMovies,
    tmdbId,
  };

  return JSON.stringify(data);
}

async function getRelatedMovies(connection: MongoClient, movie: movie) {
  const relatedMoviesPromise: Array<Promise<WithId<movie>[]>> = [];
  const movieCollection = connection
    .db("sample_mflix")
    .collection<movie>("movies");

  movie.cast?.map((cast) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ cast })
        .limit(5)
        .project<movie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  movie.directors?.map((director) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ directors: director })
        .limit(5)
        .project<movie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  movie.writers?.map((writer) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ writers: writer })
        .limit(5)
        .project<movie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  movie.languages?.map((language) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ languages: language })
        .limit(10)
        .project<movie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  const relatedMovies = (await Promise.all(relatedMoviesPromise)).flat();

  const uniqueRelatedMovies = relatedMovies.filter(
    (mov) => mov._id.toString() !== movie._id.toString(),
  );

  return uniqueRelatedMovies;
}

export async function searchMovies({
  query,
  limit,
  page,
  sortBy,
  sortOrder,
}: {
  query: Object;
  limit?: number;
  page: number | 1;
  sortBy?: string;
  sortOrder?: 1 | -1;
}) {
  const connection = await connectionPromise;
  const collection = connection.db("sample_mflix").collection("movies");
  const movies = await collection
    .find(query)
    .sort(sortBy && sortOrder ? { [sortBy]: sortOrder } : { year: -1 })
    .skip((page - 1) * 20)
    .limit(limit ? limit : 5)
    .project({ poster: 1, title: 1, imdb: 1, genres: 1, plot: 1 })
    .toArray();
  const noOfMovies = await collection.countDocuments(query);
  const data = JSON.stringify({ movies, noOfMovies });
  return data;
}

export async function searchTMDB(query: string, page: number) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&page=${page}&sort_by=primary_release_date.asc`;
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

async function getTMDBId(ImdbId: number) {
  const url = `https://api.themoviedb.org/3/find/tt${ImdbId}?external_source=imdb_id`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDBAuthorization,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data?.movie_results[0]?.id;
}
