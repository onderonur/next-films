import type { Id } from '@/core/shared/types';
import { createMockArray } from '@/core/shared/utils';
import { GridList } from '@/core/ui/components/grid-list';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import {
  MovieCard,
  MovieCardSkeleton,
} from '@/features/movies/components/movie-card';
import { getPersonCredits } from '@/features/people/data';

type PersonCrewingsShellProps = {
  children: React.ReactNode;
};

function PersonCrewingsShell({ children }: PersonCrewingsShellProps) {
  return (
    <section>
      <Padder>
        <Title level={2} title="Crew" />
        {children}
      </Padder>
    </section>
  );
}

type PersonCrewingsProps = {
  personId: Id;
};

export async function PersonCrewings({ personId }: PersonCrewingsProps) {
  const { crew } = await getPersonCredits(personId);

  return (
    <PersonCrewingsShell>
      <GridList listEmptyMessage="No crew info has been found.">
        {crew.map((crewing) => {
          return (
            <li key={crewing.id}>
              <MovieCard movie={crewing} subheader={crewing.job} />
            </li>
          );
        })}
      </GridList>
    </PersonCrewingsShell>
  );
}

export function PersonCrewingsSkeleton() {
  return (
    <PersonCrewingsShell>
      <GridList>
        {createMockArray(12).map((key) => {
          return (
            <li key={key}>
              <MovieCardSkeleton />
            </li>
          );
        })}
      </GridList>
    </PersonCrewingsShell>
  );
}
