'use client';

import { AppTitle } from '@/core/layouts/components/app-title';
import { useOnRouteChange } from '@/core/routing/hooks';
import type { Maybe } from '@/core/shared/types';
import { ListItemLink } from '@/core/ui/components/list-item-link';
import type { Genre } from '@/features/movies/types';
import { TmdbAttribution } from '@/features/tmdb/components/tmdb-attribution';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/RecentActors';
import StarIcon from '@mui/icons-material/StarRate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { DrawerProps } from '@mui/material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createUrl } from '../../routing/utils';
import { mergeSx } from '../../theme/utils';
import { APP_DRAWER_WIDTH } from './app-drawer.utils';

type AppDrawerContextValue = {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
};

const AppDrawerContext = createContext<Maybe<AppDrawerContextValue>>(null);

function useAppDrawerContext() {
  const value = useContext(AppDrawerContext);
  if (!value) throw new Error('AppDrawerContext is not found');
  return value;
}

type AppDrawerProviderProps = {
  children: React.ReactNode;
};

export function AppDrawerProvider({ children }: AppDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const contextValue = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [close, isOpen, open, toggle],
  );

  return (
    <AppDrawerContext.Provider value={contextValue}>
      {children}
    </AppDrawerContext.Provider>
  );
}

export function AppDrawerToggleButton() {
  const { toggle } = useAppDrawerContext();

  return (
    <IconButton aria-label="Toggle drawer" onClick={toggle}>
      <MenuIcon />
    </IconButton>
  );
}

type AppDrawerItemProps = {
  icon?: React.ReactNode;
  title: string;
  selected: boolean;
  href: string;
};

function AppDrawerItem({ href, icon, title, selected }: AppDrawerItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemLink href={href} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemLink>
    </ListItem>
  );
}

type AppDrawerProps = {
  genres: Genre[];
};

export function AppDrawer({ genres }: AppDrawerProps) {
  const { isOpen, close } = useAppDrawerContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genreId = Number(searchParams.get('genreId'));

  useOnRouteChange(() => {
    close();
  });

  const drawerContent = (
    <>
      <Toolbar>
        <AppTitle />
      </Toolbar>
      <Divider />
      <Box
        component="nav"
        sx={{
          overflow: 'auto',
        }}
      >
        <List subheader={<ListSubheader>Discover</ListSubheader>}>
          <AppDrawerItem
            href="/movies/discover"
            selected={pathname === '/movies/discover' && !genreId}
            icon={<LightbulbIcon />}
            title="Discover Movies"
          />
          <AppDrawerItem
            href="/movies/popular"
            selected={pathname === '/movies/popular'}
            icon={<TrendingUpIcon />}
            title="Popular Movies"
          />
          <AppDrawerItem
            href="/movies/top-rated"
            selected={pathname === '/movies/top-rated'}
            icon={<StarIcon />}
            title="Top Rated Movies"
          />
          <AppDrawerItem
            href="/people/popular"
            selected={pathname === '/people/popular'}
            icon={<PersonIcon />}
            title="Popular People"
          />
        </List>
        <Divider />
        <List subheader={<ListSubheader>Movie Genres</ListSubheader>}>
          {genres.map((genre) => {
            const searchParams = new URLSearchParams();
            searchParams.set('genreId', genre.id.toString());

            return (
              <AppDrawerItem
                key={genre.id}
                href={createUrl('/movies/discover', searchParams)}
                title={genre.name}
                selected={
                  pathname === '/movies/discover' && genreId === genre.id
                }
              />
            );
          })}
        </List>
      </Box>
      <Divider />
      <TmdbAttribution />
    </>
  );

  const drawerProps: DrawerProps = {
    open: isOpen,
    onClose: close,
    sx: {
      '.MuiDrawer-paper': {
        width: APP_DRAWER_WIDTH,
        backgroundImage: 'none',
        backgroundColor: 'background.default',
      },
    },
  };

  return (
    <>
      <Drawer
        variant="permanent"
        {...drawerProps}
        sx={mergeSx(drawerProps.sx, { display: { xs: 'none', lg: 'block' } })}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="temporary"
        {...drawerProps}
        sx={{
          ...drawerProps.sx,
          display: { lg: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
