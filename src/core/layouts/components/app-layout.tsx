import {
  AppDrawer,
  AppDrawerProvider,
} from '@/core/layouts/components/app-drawer';
import { APP_DRAWER_WIDTH } from '@/core/layouts/components/app-drawer.utils';
import { AppHeader } from '@/core/layouts/components/app-header';
import type { Genre } from '@/features/movies/types';
import { Box, Container } from '@mui/material';
import { Suspense } from 'react';

type AppLayoutProps = {
  genres: Genre[];
  children: React.ReactNode;
};

export function AppLayout({ genres, children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <Box sx={{ display: 'flex' }}>
        {/* Since we use `useSearchParams` in `<AppDrawer>`, we wrap it with `<Suspense>` */}
        <Suspense>
          <AppDrawer genres={genres} />
        </Suspense>
        <Box
          sx={{
            flex: 1,
            padding: { xs: 0, md: 0 },
            marginBottom: 6,
            marginLeft: { lg: APP_DRAWER_WIDTH },
            // Since the content wrapper has `flex` style, components like carousels cause
            // horizontal scroll to appear on `<body>`.
            // To prevent this, we use `min-width: 0` here.
            // https://defensivecss.dev/tip/grid-min-content-size/
            minWidth: 0,
          }}
        >
          <Container maxWidth="xl" sx={{ padding: { xs: 0, md: 0 } }}>
            {children}
          </Container>
        </Box>
      </Box>
    </AppDrawerProvider>
  );
}
