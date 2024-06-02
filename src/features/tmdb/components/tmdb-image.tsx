'use client';

import type { Omit } from '@/core/shared/types';
import type { BaseImageProps } from '@/core/ui/components/base-image';
import { BaseImage } from '@/core/ui/components/base-image';
import { useTmdbConfigurationContext } from '@/features/tmdb/components/tmdb-configuration-context';
import type { TmdbImageQuality } from '@/features/tmdb/types';

type TmdbImageProps = Omit<BaseImageProps, 'src'> & {
  src: string;
  tmdbImageQuality?: TmdbImageQuality;
};

export function TmdbImage({ src, tmdbImageQuality, ...rest }: TmdbImageProps) {
  const { getImageUrl } = useTmdbConfigurationContext();

  const imageUrl = getImageUrl(src, tmdbImageQuality);

  return <BaseImage src={imageUrl} {...rest} />;
}
