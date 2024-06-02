import { AppDrawerToggleButton } from '@/core/layouts/components/app-drawer';
import { NextLink } from '@/core/routing/components/next-link';
import { APP_TITLE } from '@/core/shared/utils';
import { Box } from '@mui/material';

export function AppTitle() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <AppDrawerToggleButton />
      </Box>
      <NextLink
        href="/"
        color="inherit"
        sx={{
          typography: 'h6',
          fontWeight: 'bold',
        }}
      >
        {APP_TITLE}
      </NextLink>
    </Box>
  );
}
