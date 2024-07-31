import { ObjectId } from "mongodb";

export interface mongoDBQueryResult {
  movies: Array<mongoMovie>;
  noOfMovies: number;
}

export interface TMDBQueryResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<TMDBMovie>;
}

export interface TMDBMovie {
  success: boolean;
  status_code: number;
  status_message: string;

  name: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
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
  number_of_episodes: number;
  number_of_seasons: number;
  first_air_date: string;
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
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
  videos: {
    results: Array<vidObj>;
  };
  images: {
    backdrops: Array<imgObj>;
    id: number;
    posters: Array<imgObj>;
    logos: Array<imgObj>;
  };
}

export interface imgObj {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface vidObj {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface mongoMovie {
  id: number;
  backdrop_path: string;
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
  recommendations: Array<mongoMovie>;
}

export interface comment {
  _id: string;
  name: string;
  date: Date;
  text: string;
}
