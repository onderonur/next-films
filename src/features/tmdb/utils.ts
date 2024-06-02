import { httpClient } from '@/core/http-client/http-client';
import type { Maybe } from '@/core/shared/types';
import type { TmdbConfiguration, TmdbImageQuality } from './types';

export const tmdbClient = {
  get: async <T>(
    pathname: string,
    searchParams?: URLSearchParams,
  ): Promise<T> => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('api_key', process.env.API_KEY as string);

    const response = await httpClient.get<T>(
      `${process.env.API_URL}${pathname}`,
      newSearchParams,
    );

    return response;
  },
};

export function getTmdbImageUrl({
  tmdbConfiguration,
  imagePath,
  quality = 'w500',
}: {
  tmdbConfiguration: TmdbConfiguration;
  imagePath: Maybe<string>;
  quality?: TmdbImageQuality;
}) {
  if (!imagePath) return '/placeholder.png';

  return `${tmdbConfiguration.images.secure_base_url}${quality}${imagePath}`;
}
