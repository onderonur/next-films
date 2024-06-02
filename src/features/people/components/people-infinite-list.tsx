'use client';

import type { PaginationResponse } from '@/core/shared/types';
import { getAllPageResults, getHasNextPage } from '@/core/shared/utils';
import {
  InfiniteGridList,
  getInfiniteSwrKey,
} from '@/core/ui/components/infinite-grid-list';
import type { PersonListItem } from '@/features/people/types';
import useSWRInfinite from 'swr/infinite';
import { PersonCard } from './person-card';

type PeopleInfiniteListProps = {
  firstPage: PaginationResponse<PersonListItem>;
  pageKeyTemplate: string;
};

export function PeopleInfiniteGridList({
  firstPage,
  pageKeyTemplate,
}: PeopleInfiniteListProps) {
  const { data, setSize, isValidating } = useSWRInfinite<
    PaginationResponse<PersonListItem>
  >((pageIndex: number) => getInfiniteSwrKey({ pageIndex, pageKeyTemplate }), {
    fallbackData: [firstPage],
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
      {getAllPageResults(data).map((person) => {
        return (
          <li key={person.id}>
            <PersonCard person={person} />
          </li>
        );
      })}
    </InfiniteGridList>
  );
}
