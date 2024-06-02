'use client';

import type { Maybe, PaginationResponse } from '@/core/shared/types';
import { getAllPageResults, getHasNextPage } from '@/core/shared/utils';
import {
  InfiniteGridList,
  getInfiniteSwrKey,
} from '@/core/ui/components/infinite-grid-list';
import { MovieCard } from '@/features/movies/components/movie-card';
import type { MovieListItem } from '@/features/movies/types';
import useSWRInfinite from 'swr/infinite';

type MovieInfiniteGridListProps = {
  firstPage: Maybe<PaginationResponse<MovieListItem>>;
  pageKeyTemplate: string;
  skipFirstMovie?: boolean;
};

export function MovieInfiniteGridList({
  firstPage,
  pageKeyTemplate,
  skipFirstMovie,
}: MovieInfiniteGridListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<MovieListItem>
  >((pageIndex: number) => getInfiniteSwrKey({ pageIndex, pageKeyTemplate }), {
    fallbackData: firstPage ? [firstPage] : [],
    // To prevent fetching the first page when the next page is loading.
    revalidateFirstPage: false,
    // To prevent refetching the first page on client-side,
    // since we already provide it through `fallbackData` by fetching it on the server-side.
    revalidateIfStale: false,
  });

  const hasNextPage = getHasNextPage(data);

  return (
    <InfiniteGridList
      loading={isValidating}
      hasNextPage={hasNextPage}
      onLoadMore={() => setSize((currentSize) => currentSize + 1)}
    >
      {getAllPageResults(data).map((movie, i) => {
        // Since we show the first movie as featured, we ignore it in the list.
        if (skipFirstMovie && i === 0) return null;

        return (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        );
      })}
    </InfiniteGridList>
  );
}
