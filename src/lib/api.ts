import { Movie, TvShow, Book } from "@/types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TMDb API Key
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY; // Google Books API Key

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchMovies = async (keyword: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        keyword
      )}&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const searchTvShows = async (keyword: string): Promise<TvShow[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        keyword
      )}&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch TV shows");
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};

export const searchBooks = async (keyword: string): Promise<Book[]> => {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(
        keyword
      )}&key=${GOOGLE_BOOKS_API_KEY}&maxResults=40`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    
    const data = await response.json();
    
    if (!data.items) {
      return [];
    }
    
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["Unknown Author"],
      description: item.volumeInfo.description || "No description available.",
      imageLinks: item.volumeInfo.imageLinks,
      publishedDate: item.volumeInfo.publishedDate,
      infoLink: item.volumeInfo.infoLink
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const getRandomItem = <T>(items: T[]): T | null => {
  if (!items || items.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};
