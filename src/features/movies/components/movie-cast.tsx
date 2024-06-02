import type { Id } from '@/core/shared/types';
import { createMockArray } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import {
  SeeAllLink,
  SeeAllLinkSkeleton,
} from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import { Title } from '@/core/ui/components/title';
import {
  MoviePersonCard,
  MoviePersonCardSkeleton,
} from '@/features/movies/components/movie-person-card';
import { getMovieCredits } from '@/features/movies/data';

type MovieCastShellProps = {
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

function MovieCastShell({ seeAllLink, children }: MovieCastShellProps) {
  return (
    <section>
      <Padder>
        <Title level={2} title="Cast" extra={seeAllLink} />
        <SingleRowGridList itemWidth={{ xs: '12rem', md: '16rem' }}>
          {children}
        </SingleRowGridList>
      </Padder>
    </section>
  );
}

type MovieCastProps = {
  movieId: Id;
};

export async function MovieCast({ movieId }: MovieCastProps) {
  const credits = await getMovieCredits(movieId);

  if (!credits.cast.length) return null;

  return (
    <MovieCastShell
      seeAllLink={<SeeAllLink href={`/movies/${movieId}/people`} />}
    >
      {credits.cast.slice(0, 10).map((movieCast) => {
        return (
          <li key={movieCast.id}>
            <MoviePersonCard
              personId={movieCast.id}
              imageSrc={movieCast.profile_path}
              title={movieCast.name}
              subheader={movieCast.character}
            />
          </li>
        );
      })}
    </MovieCastShell>
  );
}

export function MovieCastSkeleton() {
  return (
    <MovieCastShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(10).map((key) => {
        return (
          <li key={key}>
            <MoviePersonCardSkeleton />
          </li>
        );
      })}
    </MovieCastShell>
  );
}
