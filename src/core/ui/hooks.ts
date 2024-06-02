import { useMediaQuery, useTheme } from '@mui/material';
import { useSyncExternalStore } from 'react';

export function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile;
}

const windowScrollYStore = {
  subcribe: (callback: VoidFunction) => {
    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  },
  getSnapshot: () => {
    return window.scrollY;
  },
  getServerSnapshot: () => {
    return 0;
  },
};

export function useWindowScrollY() {
  const windowScrollY = useSyncExternalStore(
    windowScrollYStore.subcribe,
    windowScrollYStore.getSnapshot,
    windowScrollYStore.getServerSnapshot,
  );

  return windowScrollY;
}
