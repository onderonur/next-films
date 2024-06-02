import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { PeopleInfiniteGridList } from '@/features/people/components/people-infinite-list';
import { getPopularPeople } from '@/features/people/data';

export const dynamic = 'force-dynamic';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(FIRST_PAGE);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <AppHeaderOffset>
      <main>
        <Padder>
          <Title level={1} title="Popular People" />
          <PeopleInfiniteGridList
            pageKeyTemplate={`/api/people/popular?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
          />
        </Padder>
      </main>
    </AppHeaderOffset>
  );
}
