'use client';

import { AppTitle } from '@/core/layouts/components/app-title';
import { NextLink } from '@/core/routing/components/next-link';
import { useIsMobile } from '@/core/ui/hooks';
import { SearchInput } from '@/features/search/components/search-input';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { Suspense, useState } from 'react';

type AppHeaderOffsetProps = {
  children: React.ReactNode;
};

export function AppHeaderOffset({ children }: AppHeaderOffsetProps) {
  return (
    <div>
      <Toolbar />
      <Box sx={{ paddingTop: { md: 2 } }}>{children}</Box>
    </div>
  );
}

export function AppHeader() {
  const isMobile = useIsMobile();
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  function showMobileSearch() {
    setIsMobileSearchVisible(true);
  }

  function hideMobileSearch() {
    setIsMobileSearchVisible(false);
  }

  if (!isMobile && isMobileSearchVisible) {
    hideMobileSearch();
  }

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
  });

  return (
    <AppBar
      color="transparent"
      sx={{
        transition: 'background-color 300ms ease-in-out',
        bgcolor: scrollTrigger ? 'background.default' : undefined,
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {!isMobileSearchVisible && <AppTitle />}

        <Box sx={{ display: { xs: 'flex', md: 'none', flex: 1, gap: 1 } }}>
          {isMobileSearchVisible && (
            <>
              <IconButton aria-label="Hide search" onClick={hideMobileSearch}>
                <ArrowBackIcon />
              </IconButton>
              <SearchInput autoFocus />
            </>
          )}
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            marginX: 2,
            justifyContent: 'center',
          }}
        >
          {/* Since we use `useSearchParams` in `<SearchInput>`, we wrap it with `<Suspense>` */}
          <Suspense>
            <SearchInput sx={{ maxWidth: 'sm' }} />
          </Suspense>
        </Box>

        {!isMobileSearchVisible && (
          <Stack spacing={1} direction="row">
            <IconButton
              aria-label="Show search"
              onClick={showMobileSearch}
              sx={{ display: { md: 'none' } }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-label="Toggle theme"
              href="https://github.com/onderonur/next-moviez"
              LinkComponent={NextLink}
            >
              <GitHubIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
