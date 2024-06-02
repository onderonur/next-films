'use client';

import type { Maybe } from '@/core/shared/types';
import type {
  TmdbConfiguration,
  TmdbImageQuality,
} from '@/features/tmdb/types';
import { getTmdbImageUrl } from '@/features/tmdb/utils';
import { createContext, useContext } from 'react';

type TmdbConfigurationContextValue = TmdbConfiguration & {
  getImageUrl: (imagePath: Maybe<string>, quality?: TmdbImageQuality) => string;
};

const TmdbConfigurationContext =
  createContext<Maybe<TmdbConfigurationContextValue>>(null);

export function useTmdbConfigurationContext() {
  const value = useContext(TmdbConfigurationContext);
  if (!value) throw new Error('TmdbConfigurationContext is not found');
  return value;
}

type TmdbConfigurationProviderProps = {
  tmdbConfiguration: TmdbConfiguration;
  children: React.ReactNode;
};

export function TmdbConfigurationProvider({
  tmdbConfiguration,
  children,
}: TmdbConfigurationProviderProps) {
  const getImageUrl: TmdbConfigurationContextValue['getImageUrl'] = (
    imagePath,
    quality,
  ) => {
    return getTmdbImageUrl({
      tmdbConfiguration,
      imagePath,
      quality,
    });
  };

  return (
    <TmdbConfigurationContext.Provider
      value={{
        ...tmdbConfiguration,
        getImageUrl,
      }}
    >
      {children}
    </TmdbConfigurationContext.Provider>
  );
}
