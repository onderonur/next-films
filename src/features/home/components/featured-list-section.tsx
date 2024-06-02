import type { PaginationResponse } from '@/core/shared/types';
import { createMockArray } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import {
  SeeAllLink,
  SeeAllLinkSkeleton,
} from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import { Title } from '@/core/ui/components/title';
import { MediaType } from '@/features/media/utils';
import {
  MovieCard,
  MovieCardSkeleton,
} from '@/features/movies/components/movie-card';
import type { MovieListItem } from '@/features/movies/types';
import {
  PersonCard,
  PersonCardSkeleton,
} from '@/features/people/components/person-card';
import type { PersonListItem } from '@/features/people/types';

type FeaturedListShellProps = {
  title: string;
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

// TODO: Will change the name of the folder of this file.
// This component is not for home page. It is used in search page too etc.
function FeaturedListSectionShell({
  title,
  seeAllLink,
  children,
}: FeaturedListShellProps) {
  return (
    <section>
      <Padder>
        <Title level={2} title={title} extra={seeAllLink} />
      </Padder>
      <Padder>
        <SingleRowGridList itemWidth={{ xs: '9rem', md: '12rem' }}>
          {children}
        </SingleRowGridList>
      </Padder>
    </section>
  );
}

type FeaturedListSkeletonProps = {
  title: string;
  mediaType: MediaType;
};

export function FeaturedListSectionSkeleton({
  title,
  mediaType,
}: FeaturedListSkeletonProps) {
  return (
    <FeaturedListSectionShell title={title} seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(20).map((key) => {
        return (
          <li key={key}>
            {mediaType === MediaType.MOVIE ? (
              <MovieCardSkeleton />
            ) : (
              <PersonCardSkeleton />
            )}
          </li>
        );
      })}
    </FeaturedListSectionShell>
  );
}

type FeaturedListSectionProps = {
  title: string;
  seeAllHref: string;
  mediaType: MediaType;
  skipFirstItem?: boolean;
  promise: Promise<PaginationResponse<MovieListItem | PersonListItem>>;
};

export async function FeaturedListSection({
  title,
  seeAllHref,
  mediaType,
  skipFirstItem,
  promise,
}: FeaturedListSectionProps) {
  const items = await promise;

  let startIndex = 0;

  if (skipFirstItem) {
    startIndex += 1;
  }

  return (
    <FeaturedListSectionShell
      title={title}
      seeAllLink={!!items.results.length && <SeeAllLink href={seeAllHref} />}
    >
      {items.results.slice(startIndex).map((item) => {
        return (
          <li key={item.id}>
            {mediaType === MediaType.MOVIE ? (
              <MovieCard movie={item as MovieListItem} />
            ) : (
              <PersonCard person={item as PersonListItem} />
            )}
          </li>
        );
      })}
    </FeaturedListSectionShell>
  );
}
