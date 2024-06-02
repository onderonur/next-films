import type { Id } from '@/core/shared/types';
import { createMockArray } from '@/core/shared/utils';
import { GridList } from '@/core/ui/components/grid-list';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { MovieCardSkeleton } from '@/features/movies/components/movie-card';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { getMovieRecommendations } from '@/features/movies/data';

type MovieRecommendationsShellProps = {
  children: React.ReactNode;
};

function MovieRecommendationsShell({
  children,
}: MovieRecommendationsShellProps) {
  return (
    <Padder>
      <Title level={2} title="Recommendations" />
      {children}
    </Padder>
  );
}

type MovieRecommendationsProps = {
  movieId: Id;
};

export async function MovieRecommendations({
  movieId,
}: MovieRecommendationsProps) {
  const movieRecommendations = await getMovieRecommendations(movieId, 1);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('movieId', movieId.toString());
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <MovieRecommendationsShell>
      <MovieInfiniteGridList
        pageKeyTemplate={`/api/movies/recommendations?${infiniteListSearchParams.toString()}`}
        firstPage={movieRecommendations}
      />
    </MovieRecommendationsShell>
  );
}

export function MovieRecommendationsSkeleton() {
  return (
    <MovieRecommendationsShell>
      <GridList>
        {createMockArray(12).map((key) => {
          return (
            <li key={key}>
              <MovieCardSkeleton />
            </li>
          );
        })}
      </GridList>
    </MovieRecommendationsShell>
  );
}
