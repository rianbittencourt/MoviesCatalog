import api from './api';
import { MovieResponse, Movie, MovieCredits, Genre } from '../types/movie';

export const getPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>('/movie/popular', {
    params: { page }
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const response = await api.get<Movie>(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: number): Promise<MovieCredits> => {
  const response = await api.get<MovieCredits>(`/movie/${id}/credits`);
  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get<{ genres: Genre[] }>('/genre/movie/list');
  return response.data.genres;
};

export const searchMovies = async (
  query: string,
  page: number = 1,
  genreId?: number,
  minRating?: number
): Promise<MovieResponse> => {
  const params: Record<string, any> = { page };
  
  if (query) {
    params.query = query;
    return api.get<MovieResponse>('/search/movie', { params }).then(res => res.data);
  } else {
    if (genreId) params.with_genres = genreId;
    if (minRating) params.vote_average_gte = minRating;
    return api.get<MovieResponse>('/discover/movie', { params }).then(res => res.data);
  }
};