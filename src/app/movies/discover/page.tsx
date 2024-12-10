import { searchParamParser } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
import {
  createUrl,
  parseObjectToSearchParams,
  parseSearchParams,
} from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { MovieSortingSelect } from '@/features/movies/components/movie-sorting-select';
import { getDiscoverMovies, getMovieGenre } from '@/features/movies/data';
import { Divider, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { z } from 'zod';

const searchParamsSchema = z
  .object({
    genreId: searchParamParser.toSingle(z.coerce.number()),
    sortBy: searchParamParser.toSingle(z.string()),
  })
  .partial();

type DiscoverMoviesPageProps = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata(
  props: DiscoverMoviesPageProps,
): Promise<Metadata> {
  const searchParams = await props.searchParams;

  const defaultMetadata = getMetadata({
    title: 'Discover Movies',
  });

  const { genreId } = parseSearchParams({
    searchParamsSchema,
    searchParams,
  });

  if (!genreId) return defaultMetadata;

  const genre = await getMovieGenre(genreId);

  if (!genre) return defaultMetadata;

  return getMetadata({
    title: `${genre.name} Movies`,
    description: `Discover ${genre.name} movies!`,
    pathname: createUrl(
      '/movies/discover',
      parseObjectToSearchParams(searchParams),
    ),
  });
}

export default async function DiscoverMoviesPage(
  props: DiscoverMoviesPageProps,
) {
  const searchParams = await props.searchParams;

  const { genreId, sortBy } = parseSearchParams({
    searchParamsSchema,
    searchParams,
  });

  const [genre, firstPage] = await Promise.all([
    genreId ? getMovieGenre(genreId) : undefined,
    getDiscoverMovies(FIRST_PAGE, genreId, sortBy),
  ]);

  if (!firstPage.total_results) notFound();

  const [featuredMovie] = firstPage.results;

  const infiniteListSearchParams = parseObjectToSearchParams(searchParams);
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <main>
      <FeaturedMovie movie={featuredMovie} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <Title
            level={1}
            title={genre ? `${genre.name} Movies` : 'Discover Movies'}
            extra={
              // Since we use `useSearchParams` in `<MovieSortingSelect>`, we wrap it with `<Suspense>`
              <Suspense>
                <MovieSortingSelect />
              </Suspense>
            }
          />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/movies/discover?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </main>
  );
}
