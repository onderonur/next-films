import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import { searchParamParser } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
import { parseSearchParams } from '@/core/routing/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { searchMovies } from '@/features/search/data';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const searchParamsSchema = z
  .object({
    query: searchParamParser.toSingle(z.string()),
  })
  .partial();

type SearchMoviesPageProps = {
  searchParams: SearchParams;
};

export default async function SearchMoviesPage({
  searchParams,
}: SearchMoviesPageProps) {
  const { query } = parseSearchParams({
    searchParamsSchema,
    searchParams,
  });

  if (!query) notFound();

  const firstPage = await searchMovies(query, FIRST_PAGE);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');
  infiniteListSearchParams.set('query', query);

  return (
    <AppHeaderOffset>
      <main>
        <Padder>
          <Title level={1} title={`Movie Search Results for: ${query}`} />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/search/movies?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
          />
        </Padder>
      </main>
    </AppHeaderOffset>
  );
}
