import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import { searchParamParser } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
import {
  createUrl,
  parseObjectToSearchParams,
  parseSearchParams,
} from '@/core/routing/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import {
  FeaturedListSection,
  FeaturedListSectionSkeleton,
} from '@/features/home/components/featured-list-section';
import { MediaType } from '@/features/media/utils';
import { searchMovies, searchPeople } from '@/features/search/data';
import { Stack } from '@mui/material';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { z } from 'zod';

const searchParamsSchema = z
  .object({
    query: searchParamParser.toSingle(z.string()),
  })
  .partial();

type SearchPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;

  const { query } = parseSearchParams({
    searchParamsSchema,
    searchParams,
  });

  if (!query) notFound();

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');
  infiniteListSearchParams.set('query', query);

  return (
    <AppHeaderOffset>
      <main>
        <Padder>
          <Title level={1} title={`Search Results for: ${query}`} />
          <Stack spacing={6}>
            <Suspense
              fallback={
                <FeaturedListSectionSkeleton
                  title="Movies"
                  mediaType={MediaType.MOVIE}
                />
              }
            >
              <FeaturedListSection
                title="Movies"
                seeAllHref={createUrl(
                  '/search/movies',
                  parseObjectToSearchParams(searchParams),
                )}
                mediaType={MediaType.MOVIE}
                promise={searchMovies(query, FIRST_PAGE)}
              />
            </Suspense>
            <Suspense
              fallback={
                <FeaturedListSectionSkeleton
                  title="People"
                  mediaType={MediaType.PERSON}
                />
              }
            >
              <FeaturedListSection
                title="People"
                seeAllHref={createUrl(
                  '/search/people',
                  parseObjectToSearchParams(searchParams),
                )}
                mediaType={MediaType.PERSON}
                promise={searchPeople(query, FIRST_PAGE)}
              />
            </Suspense>
          </Stack>
        </Padder>
      </main>
    </AppHeaderOffset>
  );
}
