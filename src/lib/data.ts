"use server";
import connectionPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { comment, movie } from "./defination";

export async function getAllMovies(
  query: { [key: string]: string },
  limit?: number,
) {
  const connection = await connectionPromise;
  const collection = connection.db("sample_mflix").collection<movie>("movies");
  const movies = await collection
    .find(query)
    .sort({ released: -1 })
    .limit(limit || 30)
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
  const collection = connection.db("sample_mflix").collection<movie>("movies");
  const movie = await collection.findOne<movie>({ _id: new ObjectId(id) });
  return movie;
}

export async function getComments(id: ObjectId) {
  const connection = await connectionPromise;
  const collection = connection
    .db("sample_mflix")
    .collection<comment>("comments");
  const comments = await collection
    .find({ movie_id: new ObjectId(id) })
    .sort({ date: -1 })
    .limit(10)
    .project<comment>({ name: 1, text: 1, date: 1 })
    .toArray();
  return comments;
}

export async function searchMovies({
  query,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  query: Object;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: 1 | -1;
}) {
  const connection = await connectionPromise;
  const collection = connection.db("sample_mflix").collection("movies");
  const movies = await collection
    .find(query)
    .sort(sortBy && sortOrder ? { [sortBy]: sortOrder } : { year: -1 })
    .skip(skip ? skip : 0)
    .limit(limit ? limit : 5)
    .project({ poster: 1, title: 1, IMDb: 1, genres: 1, plot: 1 })
    .toArray();
  const noOfMovies = await collection.countDocuments(query);
  const data = JSON.stringify({ movies, noOfMovies });
  return data;
}
