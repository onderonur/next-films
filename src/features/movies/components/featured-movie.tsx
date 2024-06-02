import { ButtonLink } from '@/core/ui/components/button-link';
import { Padder } from '@/core/ui/components/padder';
import type { MovieBase } from '@/features/movies/types';
import { getMovieReleaseYear } from '@/features/movies/utils';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, Stack } from '@mui/material';
import { MovieOverview } from './movie-overview';
import { MovieTitle } from './movie-title';

type FeaturedMovieProps = {
  movie: MovieBase;
};

export function FeaturedMovie({ movie }: FeaturedMovieProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 460, sm: 560, md: 660 },
        display: 'grid',
      }}
    >
      <TmdbImage
        src={movie.backdrop_path}
        alt={movie.title}
        tmdbImageQuality="original"
        fill
        priority
        sx={{
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(farthest-side at 70% 20%, transparent, #030303)',
        }}
      />
      <Box
        sx={{
          marginTop: 'auto',
          marginBottom: 2,
        }}
      >
        <Padder>
          <Stack spacing={2} sx={{ position: 'relative', maxWidth: '75ch' }}>
            <MovieTitle
              title={movie.title}
              subtitle={getMovieReleaseYear(movie)?.toString()}
            />
            <div>
              <MovieOverview text={movie.overview} maxLines={4} />
            </div>
            <div>
              <ButtonLink
                href={`/movies/${movie.id}`}
                variant="outlined"
                color="primary"
                startIcon={<InfoIcon />}
              >
                More Info
              </ButtonLink>
            </div>
          </Stack>
        </Padder>
      </Box>
    </Box>
  );
}
