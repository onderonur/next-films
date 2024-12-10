import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import type { Id } from '@/core/shared/types';
import { CardHeaderWithAvatar } from '@/core/ui/components/card';
import { GridList } from '@/core/ui/components/grid-list';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { MoviePersonCard } from '@/features/movies/components/movie-person-card';
import { getMovie, getMovieCredits } from '@/features/movies/data';
import type { MovieCrew } from '@/features/movies/types';
import { Card, CardContent, Stack } from '@mui/material';
import { notFound } from 'next/navigation';

type MoviePeoplePageProps = {
  params: Promise<{
    movieId: string;
  }>;
};

export default async function MoviePeoplePage(props: MoviePeoplePageProps) {
  const { movieId } = await props.params;
  const [movie, credits] = await Promise.all([
    getMovie(Number(movieId)),
    getMovieCredits(Number(movieId)),
  ]);

  if (!movie) notFound();

  const crewById: Record<Id, MovieCrew[]> = {};

  for (const crew of credits.crew) {
    crewById[crew.id] = [...(crewById[crew.id] ?? []), crew];
  }

  return (
    <AppHeaderOffset>
      <main>
        <Stack spacing={4}>
          <Padder disableMobilePadding>
            <Card>
              <CardHeaderWithAvatar
                title="Full Cast & Crew"
                subheader={movie.title}
                href={`/movies/${movie.id}`}
                imageSrc={movie.poster_path}
              />
            </Card>
          </Padder>
          <section>
            <Padder>
              <Title level={2} title="Cast" />
            </Padder>
            <Padder disableMobilePadding>
              <Card>
                <CardContent>
                  <GridList>
                    {credits.cast.map((castCredit) => {
                      return (
                        <li key={castCredit.id}>
                          <MoviePersonCard
                            personId={castCredit.id}
                            imageSrc={castCredit.profile_path}
                            title={castCredit.name}
                            subheader={castCredit.character}
                          />
                        </li>
                      );
                    })}
                  </GridList>
                </CardContent>
              </Card>
            </Padder>
          </section>
          <section>
            <Padder>
              <Title level={2} title="Crew" />
            </Padder>
            <Padder disableMobilePadding>
              <Card>
                <CardContent>
                  <GridList>
                    {Object.values(crewById).map((crewCredits) => {
                      const [first] = crewCredits;

                      return (
                        <li key={first.id}>
                          <MoviePersonCard
                            personId={first.id}
                            imageSrc={first.profile_path}
                            title={first.name}
                            subheader={crewCredits
                              .map((crewCredit) => crewCredit.job)
                              .join(', ')}
                          />
                        </li>
                      );
                    })}
                  </GridList>
                </CardContent>
              </Card>
            </Padder>
          </section>
        </Stack>
      </main>
    </AppHeaderOffset>
  );
}
