"use server";
import connectionPromise from "@/lib/mongodb";
import { MongoClient, ObjectId, WithId } from "mongodb";
import { mongoMovie, comment } from "./defination";
import { getTMDBId } from "./tmdbData";

export async function getAllMongoMovies(
  query: { [key: string]: string },
  limit?: number,
) {
  const connection = await connectionPromise;
  const collection = connection
    .db("sample_mflix")
    .collection<mongoMovie>("movies");
  const movies = await collection
    .find(query)
    .sort({ released: -1 })
    .limit(limit || 50)
    .project<mongoMovie>({
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

export async function getMongoMovie(id: ObjectId) {
  const connection = await connectionPromise;

  const movieCollection = connection
    .db("sample_mflix")
    .collection<mongoMovie>("movies");
  const movie = await movieCollection.findOne<mongoMovie>({
    _id: new ObjectId(id),
  });

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
  const relatedMovies = await getRelatedMongoMovies(connection, movie);
  const tmdbId = await getTMDBId(movie.imdb.id);
  const data: mongoMovie = {
    ...movie,
    comments,
    recommendations: relatedMovies,
    tmdbId,
  };

  return JSON.stringify(data);
}

async function getRelatedMongoMovies(
  connection: MongoClient,
  movie: mongoMovie,
) {
  const relatedMoviesPromise: Array<Promise<WithId<mongoMovie>[]>> = [];
  const movieCollection = connection
    .db("sample_mflix")
    .collection<mongoMovie>("movies");

  movie.cast?.map((cast) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ cast })
        .limit(5)
        .project<mongoMovie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  movie.directors?.map((director) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ directors: director })
        .limit(5)
        .project<mongoMovie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  movie.writers?.map((writer) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ writers: writer })
        .limit(5)
        .project<mongoMovie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  movie.languages?.map((language) =>
    relatedMoviesPromise.push(
      movieCollection
        .find({ languages: language })
        .limit(10)
        .project<mongoMovie>({ title: 1, poster: 1 })
        .toArray(),
    ),
  );
  const relatedMovies = (await Promise.all(relatedMoviesPromise)).flat();

  const uniqueRelatedMovies = relatedMovies.filter(
    (mov) => mov._id.toString() !== movie._id.toString(),
  );

  return uniqueRelatedMovies;
}

export async function searchMongoMovies({
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
