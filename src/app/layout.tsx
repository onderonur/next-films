import { AppLayout } from '@/core/layouts/components/app-layout';
import { getMetadata } from '@/core/seo/utils';
import { BaseSWRConfig } from '@/core/swr/components/base-swr-config';
import { BaseGlobalStyles } from '@/core/theme/components/global-styles';
import { ThemeRegistry } from '@/core/theme/components/theme-registry';
import { getMovieGenres } from '@/features/movies/data';
import { TmdbConfigurationProvider } from '@/features/tmdb/components/tmdb-configuration-context';
import { getTmdbConfiguration } from '@/features/tmdb/data';
import type { Viewport } from 'next';

// TODO: Improve metadata of pages
// TODO: Check 'use client' usages

// TODO: Do we need this 🤔
export const metadata = getMetadata({});

export const viewport: Viewport = {
  themeColor: '#141f29',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const [tmdbConfiguration, genres] = await Promise.all([
    getTmdbConfiguration(),
    getMovieGenres(),
  ]);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <BaseGlobalStyles />
          <BaseSWRConfig>
            <TmdbConfigurationProvider tmdbConfiguration={tmdbConfiguration}>
              <AppLayout genres={genres}>{children}</AppLayout>
            </TmdbConfigurationProvider>
          </BaseSWRConfig>
        </ThemeRegistry>
      </body>
    </html>
  );
}
