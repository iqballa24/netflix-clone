export interface Genre {
  id: number;
  name: string;
}

export type genre = {
  id: string;
  name: string;
};

export interface Movie {
  title: string;
  name: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres: genre[];
  tagline: string;
  status: string;
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser';
}

export interface FormAuth {
  username: string;
  email: string;
  password: string;
}
