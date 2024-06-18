// import { ObjectId } from "mongodb";

import { ObjectId } from "mongodb";

export interface movie {
  _id: ObjectId;
  plot: string;
  genres: Array<string>;
  runtime: number;
  rated: string;
  metacritic: number;
  cast: Array<string>;
  num_mflix_comments: number;
  poster: string;
  title: string;
  tomatoes: {
    boxOffice: string;
    consensus: string;
    critic: {
      meter: number;
      numReviews: number;
      rating: number;
    };
    dvd: Date;
    fresh: number;
    lastUpdated: Date;
    production: string;
    rotten: number;
    viewer: {
      meter: number;
      numReviews: number;
      rating: number;
    };
    website: string;
  };
  fullplot: string;
  languages: Array<string>;
  released: Date;
  directors: Array<string>;
  writers: Array<string>;
  awards: { wins: number; nominations: number; text: string };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: Array<string>;
  type: "movie" | "series";
}

export interface comment {
  _id: string;
  name: string;
  date: Date;
  text: string;
}

// export class movie {
//   constructor(
//     public _id: ObjectId,
//     public title: string,
//     public poster: string,
//     public released: number
//   ) {}
// }
