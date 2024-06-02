import { mergeSx } from '@/core/theme/utils';
import type { MovieBase } from '@/features/movies/types';
import StarIcon from '@mui/icons-material/Star';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

type MovieRatingProps = {
  movie: MovieBase;
  sx?: SxProps<Theme>;
};

export function MovieRating({ movie, sx }: MovieRatingProps) {
  return (
    <Box
      sx={mergeSx(
        {
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        },
        sx,
      )}
    >
      <StarIcon
        sx={{
          color: yellow[700],
          fontSize: 'inherit',
        }}
      />
      <Typography sx={{ fontSize: 'inherit' }}>
        <Box component="span">{movie.vote_average?.toFixed(2)}</Box>
        <Box component="span" sx={{ opacity: 0.6 }}>
          {' '}
          / 10
        </Box>
      </Typography>
    </Box>
  );
}
