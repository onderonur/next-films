'use client';

import { Box } from '@mui/material';
import TmdbImage from '@/tmdb/tmdb-image';
import { useWindowScrollY } from './common-hooks';
import { APP_DRAWER_WIDTH } from '@/layout/app-drawer-utils';

type FixedBackgroundImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  hasScrollBasedOpacity?: boolean;
  hasDimmer?: boolean;
};

export default function FixedBackgroundImage({
  src,
  alt,
  aspectRatio,
  hasScrollBasedOpacity,
  hasDimmer,
}: FixedBackgroundImageProps) {
  const windowScrollY = useWindowScrollY();

  const opacityScrollYThreshold = 300;

  const minOpacity = 0.1;

  const scrollBasedOpacity = Math.max(
    (opacityScrollYThreshold - windowScrollY) / opacityScrollYThreshold,
    minOpacity,
  );

  return (
    <Box
      // To prevent showing the image of previous movie/person until the next one's is loaded.
      key={src}
      sx={{
        position: 'fixed',
        inset: 0,
        // top is equal to AppBar min-height.
        // top: { xs: 56, sm: 64 },
        left: { xs: 0, lg: APP_DRAWER_WIDTH },
        zIndex: -1,
        transition: 'opacity 200ms ease 0s',
        opacity: hasScrollBasedOpacity ? scrollBasedOpacity : minOpacity,
        aspectRatio,
      }}
    >
      <TmdbImage
        src={src}
        alt={alt}
        tmdbImageQuality="original"
        fill
        sx={{
          objectFit: 'cover',
        }}
        priority
      />
      {hasDimmer && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              // TODO: Fix for theme ve bu featured movie'de de kullanılıo. Refactor.
              'radial-gradient(farthest-side at 70% 20%, transparent, #141f29)',
          }}
        />
      )}
    </Box>
  );
}