import { get, put } from "../api/Conexion.js";
import Movie from "../types/Movie";

export const getMovies = async (): Promise<Movie[]> => {
  return await get("movies").then((response) => response.data);
};

export const setRating = async (movieId: string, rating: number) => {
  return await put(`movie/${movieId}`, { rating });
};
