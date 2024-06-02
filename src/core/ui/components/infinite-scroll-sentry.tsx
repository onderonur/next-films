import useInfiniteScroll from 'react-infinite-scroll-hook';
import { LoadingIndicator } from './loading-indicator';

export type InfiniteScrollSentryProps = Pick<
  Parameters<typeof useInfiniteScroll>[0],
  'hasNextPage' | 'loading' | 'onLoadMore'
>;

export function InfiniteScrollSentry({
  hasNextPage,
  loading,
  onLoadMore,
}: InfiniteScrollSentryProps) {
  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!hasNextPage) return null;

  return (
    <LoadingIndicator
      ref={sentryRef}
      // If list has next page, we keep loading shown
      // to prevent flickering of loading indicator.
      loading
    />
  );
}
