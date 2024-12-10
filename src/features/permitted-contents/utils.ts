import type { PaginationResponse } from '@/core/shared/types';
import { isOfType } from '@/core/shared/utils';
import type { PermittedMovie, PermittedPerson } from './types';

export const PERMITTED_LIMIT = {
  minVoteCount: 200,
  minPopularity: 5,
};

export function isMoviePermitted(movie: PermittedMovie) {
  return (
    !movie.adult &&
    movie.vote_count >= PERMITTED_LIMIT.minVoteCount &&
    movie.popularity >= PERMITTED_LIMIT.minPopularity
  );
}

export function filterPermittedMovies<T extends PermittedMovie>(movies: T[]) {
  return movies.filter((movie) => isMoviePermitted(movie));
}

export function isPersonPermitted(person: PermittedPerson) {
  return !person.adult && person.popularity >= PERMITTED_LIMIT.minPopularity;
}

export function filterPermittedPeople<T extends PermittedPerson>(people: T[]) {
  return people.filter((person) => isPersonPermitted(person));
}

export function filterPermittedPageResults<
  T extends PermittedMovie | PermittedPerson,
>(page: PaginationResponse<T>): PaginationResponse<T> {
  const remainingItems = page.results.filter((item) => {
    if (isOfType<PermittedMovie>(item, ['title', 'overview', 'release_date'])) {
      return isMoviePermitted(item);
    }

    if (isOfType<PermittedPerson>(item, ['name', 'profile_path'])) {
      return isPersonPermitted(item);
    }

    return false;
  });

  const removedItemCount = page.results.length - remainingItems.length;

  let { total_pages } = page;

  if (!remainingItems.length) {
    total_pages = page.page === 1 ? 0 : page.page;
  }

  return {
    ...page,
    results: remainingItems,
    // `total_results` and `total_pages` calculation is not the perfect way to do it.
    // But it's just for demo purposes.
    total_results: page.total_results - removedItemCount,
    // If all of the items are removed, we set this page as the last one
    // to stop infinite loaders.
    total_pages,
  };
}
