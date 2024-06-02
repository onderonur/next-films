import { createUrl } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import {
  FeaturedListSection,
  FeaturedListSectionSkeleton,
} from '@/features/home/components/featured-list-section';
import { MediaType } from '@/features/media/utils';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import {
  getDiscoverMovies,
  getMovieGenres,
  getPopularMovies,
  getTopRatedMovies,
} from '@/features/movies/data';
import { getPopularPeople } from '@/features/people/data';
import { Divider, Stack } from '@mui/material';
import { Suspense } from 'react';

export const metadata = getMetadata({
  title: 'Home',
  pathname: '/',
});

export default async function HomePage() {
  const [movieGenres, popularMovies] = await Promise.all([
    getMovieGenres(),
    getPopularMovies(FIRST_PAGE),
  ]);

  const [featuredMovie] = popularMovies.results;

  return (
    <main>
      <FeaturedMovie movie={featuredMovie} />

      <Stack spacing={6}>
        <Divider />

        <Suspense
          fallback={
            <FeaturedListSectionSkeleton
              title="Popular Movies"
              mediaType={MediaType.MOVIE}
            />
          }
        >
          <FeaturedListSection
            title="Popular Movies"
            mediaType={MediaType.MOVIE}
            seeAllHref="/movies/popular"
            promise={getPopularMovies(FIRST_PAGE)}
            // Since we show the first popular movie as the featured movie,
            // we don't show it here in the list again.
            skipFirstItem
          />
        </Suspense>

        <Suspense
          fallback={
            <FeaturedListSectionSkeleton
              title="Top Rated Movies"
              mediaType={MediaType.MOVIE}
            />
          }
        >
          <FeaturedListSection
            title="Top Rated Movies"
            mediaType={MediaType.MOVIE}
            seeAllHref="/movies/top-rated"
            promise={getTopRatedMovies(FIRST_PAGE)}
          />
        </Suspense>

        <Suspense
          fallback={
            <FeaturedListSectionSkeleton
              title="Popular People"
              mediaType={MediaType.PERSON}
            />
          }
        >
          <FeaturedListSection
            title="Popular People"
            mediaType={MediaType.PERSON}
            seeAllHref="/people/popular"
            promise={getPopularPeople(FIRST_PAGE)}
          />
        </Suspense>

        {movieGenres.slice(0, 5).map((genre) => {
          const searchParams = new URLSearchParams();
          searchParams.set('genreId', genre.id.toString());

          const title = `${genre.name} Movies`;
          const mediaType = MediaType.MOVIE;

          return (
            <Suspense
              key={genre.id}
              fallback={
                <FeaturedListSectionSkeleton
                  title={title}
                  mediaType={mediaType}
                />
              }
            >
              <FeaturedListSection
                title={`${genre.name} Movies`}
                mediaType={mediaType}
                seeAllHref={createUrl('/movies/discover', searchParams)}
                promise={getDiscoverMovies(FIRST_PAGE, genre.id)}
              />
            </Suspense>
          );
        })}
      </Stack>
    </main>
  );
}
