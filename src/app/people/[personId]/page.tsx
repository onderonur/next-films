import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import { getMetadata } from '@/core/seo/utils';
import {
  PersonCastings,
  PersonCastingsSkeleton,
} from '@/features/people/components/person-castings';
import {
  PersonCrewings,
  PersonCrewingsSkeleton,
} from '@/features/people/components/person-crewings';
import {
  PersonImages,
  PersonImagesSkeleton,
} from '@/features/people/components/person-images';
import { PersonSummary } from '@/features/people/components/person-summary';
import { getPerson } from '@/features/people/data';
import { getTmdbConfiguration } from '@/features/tmdb/data';
import { getTmdbImageUrl } from '@/features/tmdb/utils';
import { Container, Divider, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function getPageData(personId: string) {
  const [tmdbConfiguration, person] = await Promise.all([
    getTmdbConfiguration(),
    getPerson(Number(personId)),
  ]);

  if (!person) notFound();

  return { tmdbConfiguration, person };
}

type PersonPageProps = {
  params: Promise<{
    personId: string;
  }>;
};

export async function generateMetadata(
  props: PersonPageProps,
): Promise<Metadata> {
  const { personId } = await props.params;
  const { tmdbConfiguration, person } = await getPageData(personId);

  return getMetadata({
    title: person.name,
    description: person.biography,
    pathname: `/people/${personId}`,
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: person.profile_path,
        }),
        alt: person.name,
      },
    ],
  });
}

export default async function PersonPage(props: PersonPageProps) {
  const { personId } = await props.params;
  const { person } = await getPageData(personId);

  return (
    <AppHeaderOffset>
      <main>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Container>
              <PersonSummary person={person} />
            </Container>

            <Divider />
          </Stack>

          <Suspense fallback={<PersonImagesSkeleton />}>
            <PersonImages personId={Number(personId)} />
          </Suspense>

          <Suspense fallback={<PersonCastingsSkeleton />}>
            <PersonCastings personId={Number(personId)} />
          </Suspense>

          <Suspense fallback={<PersonCrewingsSkeleton />}>
            <PersonCrewings personId={Number(personId)} />
          </Suspense>
        </Stack>
      </main>
    </AppHeaderOffset>
  );
}
