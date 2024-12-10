import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import { searchParamParser } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
import { parseSearchParams } from '@/core/routing/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { PeopleInfiniteGridList } from '@/features/people/components/people-infinite-list';
import { searchPeople } from '@/features/search/data';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const searchParamsSchema = z
  .object({
    query: searchParamParser.toSingle(z.string()),
  })
  .partial();

type SearchPeoplePageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SearchPeoplePage(props: SearchPeoplePageProps) {
  const searchParams = await props.searchParams;

  const { query } = parseSearchParams({
    searchParamsSchema,
    searchParams,
  });

  if (!query) notFound();

  const firstPage = await searchPeople(query, FIRST_PAGE);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');
  infiniteListSearchParams.set('query', query);

  return (
    <AppHeaderOffset>
      <main>
        <Padder>
          <Title level={1} title={`People Search Results for: ${query}`} />
          <PeopleInfiniteGridList
            pageKeyTemplate={`/api/search/people?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
          />
        </Padder>
      </main>
    </AppHeaderOffset>
  );
}
