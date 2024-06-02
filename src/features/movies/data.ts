import type { Id, PaginationResponse } from '@/core/shared/types';
import type { ImageInfo } from '@/features/media/types';
import type {
  Genre,
  MovieCast,
  MovieCrew,
  MovieDetails,
  MovieListItem,
  MovieVideo,
} from '@/features/movies/types';
import {
  PERMITTED_LIMIT,
  filterPermittedPageResults,
  filterPermittedPeople,
  isMoviePermitted,
} from '@/features/permitted-contents/utils';
import { tmdbClient } from '@/features/tmdb/utils';
import { cache } from 'react';
import 'server-only';

export const getMovie = cache(async (movieId: Id) => {
  const movie = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);
  if (!isMoviePermitted(movie)) return null;
  return movie;
});

export const getMovieVideos = cache(async (movieId: Id) => {
  const videos = await tmdbClient.get<PaginationResponse<MovieVideo>>(
    `/movie/${movieId}/videos`,
  );

  return videos.results;
});

export const getMovieImages = cache(async (movieId: Id) => {
  const images = await tmdbClient.get<{
    backdrops: ImageInfo[];
    logos: ImageInfo[];
    posters: ImageInfo[];
  }>(`/movie/${movieId}/images`);

  return images.backdrops;
});

export const getDiscoverMovies = cache(
  async (page: number, genreId?: Id, sortBy?: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('vote_count.gte', PERMITTED_LIMIT.minVoteCount.toString());

    if (genreId) {
      searchParams.set('with_genres', genreId.toString());
    }

    if (sortBy) {
      searchParams.set('sort_by', sortBy);
    }

    const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
      '/discover/movie',
      searchParams,
    );

    return filterPermittedPageResults(movies);
  },
);

export const getPopularMovies = cache(async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    '/movie/popular',
    new URLSearchParams({
      page: page.toString(),
    }),
  );

  return filterPermittedPageResults(movies);
});

export const getTopRatedMovies = cache(async (page: number) => {
  const movies = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    '/movie/top_rated',
    new URLSearchParams({
      page: page.toString(),
    }),
  );

  return filterPermittedPageResults(movies);
});

export const getMovieGenres = cache(async () => {
  const { genres } = await tmdbClient.get<{ genres: Genre[] }>(
    '/genre/movie/list',
  );

  return genres;
});

export const getMovieGenre = cache(async (genreId: Id) => {
  const genres = await getMovieGenres();

  return genres.find((genre) => genre.id === genreId);
});

export const getMovieRecommendations = cache(
  async (movieId: Id, page: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());

    const recommendations = await tmdbClient.get<
      PaginationResponse<MovieListItem>
    >(`/movie/${movieId}/recommendations`, searchParams);

    return filterPermittedPageResults(recommendations);
  },
);

export const getMovieCredits = cache(async (movieId: Id) => {
  const credits = await tmdbClient.get<{
    cast: MovieCast[];
    crew: MovieCrew[];
  }>(`/movie/${movieId}/credits`);

  credits.cast = filterPermittedPeople(credits.cast);
  credits.crew = filterPermittedPeople(credits.crew);

  return credits;
});
