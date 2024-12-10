import type { PaginationResponse } from '@/core/shared/types';
import type { MovieListItem } from '@/features/movies/types';
import type { PersonListItem } from '@/features/people/types';
import {
  filterPermittedMovies,
  filterPermittedPageResults,
} from '@/features/permitted-contents/utils';
import { tmdbClient } from '@/features/tmdb/utils';
import { cache } from 'react';
import 'server-only';

export const searchMovies = cache(async (query: string, page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<PaginationResponse<MovieListItem>>(
    `/search/movie`,
    searchParams,
  );

  return filterPermittedPageResults(results);
});

export const searchPeople = cache(async (query: string, page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', query);
  searchParams.set('page', page.toString());

  const results = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    `/search/person`,
    searchParams,
  );

  // TODO: This can be moved to person filter and we can remove people with empty `known_for` too.
  results.results.forEach((person) => {
    person.known_for = filterPermittedMovies(person.known_for);
  });

  return filterPermittedPageResults(results);
});
