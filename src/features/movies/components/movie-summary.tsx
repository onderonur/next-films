import { NextLink } from '@/core/routing/components/next-link';
import { Title } from '@/core/ui/components/title';
import { MovieOverview } from '@/features/movies/components/movie-overview';
import { MovieRating } from '@/features/movies/components/movie-rating';
import { MovieTitle } from '@/features/movies/components/movie-title';
import type { MovieDetails } from '@/features/movies/types';
import { getMovieReleaseYear } from '@/features/movies/utils';
import { Box, Stack, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Fragment } from 'react';

type MovieSummaryProps = {
  movie: MovieDetails;
};

export function MovieSummary({ movie }: MovieSummaryProps) {
  const releaseYear = getMovieReleaseYear(movie);

  return (
    <Box sx={{ paddingTop: { xs: 24, md: 32 } }}>
      <Stack spacing={2}>
        <Stack spacing={0.4} sx={{ maxWidth: '75ch' }}>
          <MovieTitle
            component="h1"
            title={movie.title}
            subtitle={movie.tagline && `"${movie.tagline}"`}
          />
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              color: 'text.secondary',
              typography: { xs: 'body2', md: 'body1' },
            }}
          >
            {releaseYear && <span>{releaseYear}</span>}
            <span>&middot;</span>
            <span>{movie.runtime} minutes</span>
            <span>&middot;</span>
            <MovieRating movie={movie} />
          </Stack>
          <Typography
            component="p"
            sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}
          >
            {movie.genres.map((genre, i) => {
              const isLastItem = i === movie.genres.length - 1;

              return (
                <Fragment key={genre.id}>
                  <NextLink href={`/movies/discover?genreId=${genre.id}`}>
                    {genre.name}
                  </NextLink>
                  {!isLastItem && <span>, </span>}
                </Fragment>
              );
            })}
          </Typography>
        </Stack>

        <Box component="section" sx={{ maxWidth: '75ch' }}>
          <Title level={2} title="Overview" sx={visuallyHidden} />
          <MovieOverview text={movie.overview} />
        </Box>
      </Stack>
    </Box>
  );
}
