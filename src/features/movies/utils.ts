import type { MovieBase } from './types';

export function getMovieReleaseYear(movie: MovieBase) {
  const date = movie.release_date;

  if (!date) return null;

  const year = new Date(movie.release_date).getFullYear();

  return year;
}
