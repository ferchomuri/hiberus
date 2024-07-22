import { create } from "zustand";
import Movie from "../types/Movie";
import { getMovies } from "../bridges/Movies";

type MovieStore = {
  movies: Movie[];
  isLoading: boolean;
  getMovies: () => Promise<Movie[]>;
};

const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  isLoading: false,
  getMovies: async () => {
    try {
      set(() => ({ isLoading: true }));
      const response = await getMovies();
      set(() => ({
        isLoading: false,
        movies: response,
      }));

      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      return [];
    }
  },
}));

export default useMovieStore;
