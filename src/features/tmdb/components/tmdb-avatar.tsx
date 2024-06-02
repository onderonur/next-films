'use client';

import type { BaseAvatarProps } from '@/core/ui/components/base-avatar';
import { BaseAvatar } from '@/core/ui/components/base-avatar';
import { useTmdbConfigurationContext } from '@/features/tmdb/components/tmdb-configuration-context';

type TmdbAvatarProps = BaseAvatarProps;

export function TmdbAvatar({ src, ...rest }: TmdbAvatarProps) {
  const { getImageUrl } = useTmdbConfigurationContext();

  const imageUrl = getImageUrl(src);

  return <BaseAvatar src={imageUrl} {...rest} />;
}
