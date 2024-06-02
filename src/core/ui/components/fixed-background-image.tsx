'use client';

import { APP_DRAWER_WIDTH } from '@/core/layouts/components/app-drawer.utils';
import { useWindowScrollY } from '@/core/ui/hooks';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import { Box } from '@mui/material';

type FixedBackgroundImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  hasScrollBasedOpacity?: boolean;
  hasDimmer?: boolean;
};

export function FixedBackgroundImage({
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
              'radial-gradient(farthest-side at 70% 20%, transparent, #030303)',
          }}
        />
      )}
    </Box>
  );
}
