import { createTheme, responsiveFontSizes } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: inter.style.fontFamily,
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#030303',
        paper: '#0f0f0f',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  }),
);
