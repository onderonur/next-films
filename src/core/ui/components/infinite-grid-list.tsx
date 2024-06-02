import type { GridListProps } from './grid-list';
import { GridList } from './grid-list';
import type { InfiniteScrollSentryProps } from './infinite-scroll-sentry';
import { InfiniteScrollSentry } from './infinite-scroll-sentry';

export function getInfiniteSwrKey({
  pageIndex,
  pageKeyTemplate,
}: {
  pageIndex: number;
  pageKeyTemplate: string;
}) {
  return decodeURIComponent(pageKeyTemplate).replace(
    '%pageIndex%',
    (pageIndex + 1).toString(),
  );
}

type InfiniteGridListProps = Pick<
  GridListProps,
  'listEmptyMessage' | 'children'
> &
  InfiniteScrollSentryProps;

export function InfiniteGridList({
  listEmptyMessage,
  hasNextPage,
  loading,
  children,
  onLoadMore,
}: InfiniteGridListProps) {
  return (
    <>
      <GridList listEmptyMessage={listEmptyMessage}>{children}</GridList>
      <InfiniteScrollSentry
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
      />
    </>
  );
}
