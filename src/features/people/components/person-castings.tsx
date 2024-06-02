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

type PersonCastingsShellProps = {
  children: React.ReactNode;
};

function PersonCastingsShell({ children }: PersonCastingsShellProps) {
  return (
    <section>
      <Padder>
        <Title level={2} title="Castings" />
        {children}
      </Padder>
    </section>
  );
}

type PersonCastingsProps = {
  personId: Id;
};

export async function PersonCastings({ personId }: PersonCastingsProps) {
  const { cast } = await getPersonCredits(personId);

  return (
    <PersonCastingsShell>
      <GridList listEmptyMessage="No casting has been found.">
        {cast.map((casting) => {
          return (
            <li key={casting.id}>
              <MovieCard movie={casting} subheader={casting.character} />
            </li>
          );
        })}
      </GridList>
    </PersonCastingsShell>
  );
}

export function PersonCastingsSkeleton() {
  return (
    <PersonCastingsShell>
      <GridList>
        {createMockArray(12).map((key) => {
          return (
            <li key={key}>
              <MovieCardSkeleton />
            </li>
          );
        })}
      </GridList>
    </PersonCastingsShell>
  );
}
