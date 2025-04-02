
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  imageLinks?: {
    thumbnail: string;
  };
  publishedDate: string;
  infoLink: string;
}

export type Category = "movie" | "tv" | "book";
export type Recommendation = Movie | TvShow | Book;
