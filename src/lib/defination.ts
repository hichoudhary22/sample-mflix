// import { ObjectId } from "mongodb";

import { ObjectId } from "mongodb";

export interface mongoDBQueryResult {
  movies: Array<movie>;
  noOfMovies: number;
}

export interface TMDBQueryResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<TMDBMovie>;
}

export interface TMDBMovie {
  adult: boolean;
  media_type: string;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  credits: {
    cast: Array<{
      adult: boolean;
      id: number;
      name: string;
      profile_path: string;
      character: string;
      gender: number;
    }>;
  };
  reviews: {
    total_results: number;
    results: Array<{
      author: string;
      author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
      };
      content: string;
      created_at: string;
      updated_at: string;
      url: string;
      id: string;
    }>;
  };
  recommendations: {
    results: Array<TMDBMovie>;
  };
}

export interface movie {
  tmdbId: number;
  /* 
  {
      backdrop_path: '/jAXel5sHK1bnv9lL1U4HOkdxuD9.jpg',
      id: 487186,
      title: 'Halo: Nightfall',
      original_title: 'Halo: Nightfall',
      overview: 'Set between the events of Halo 4 and Halo 5: Guardians… Halo: Nightfall tells the dramatic story of legendary man hunter and Naval Intelligence Officer Jameson Locke and his team as they are caught in a horrific biological attack while investigating terrorist activity on the distant colony world of Sedra. As they unravel a plot that draws them to an ancient, hellish artifact, they will be forced to fight for their survival, question everything and ultimately choose between their loyalty and their lives.',
      poster_path: '/liLQ8EFzHN06eFZ9KQMDK6cmGaK.jpg',
      media_type: 'movie',
      adult: false,
      original_language: 'en',
      genre_ids: [Array],
      popularity: 22.04,
      release_date: '2014-02-05',
      video: false,
      vote_average: 6.881,
      vote_count: 159
    }
  */
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
  comments: Array<{ _id: string; name: string; date: Date; text: string }>;
  recommendations: Array<movie>;
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
