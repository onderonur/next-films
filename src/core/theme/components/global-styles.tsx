import { GlobalStyles } from '@mui/material';

export function BaseGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        '::-webkit-scrollbar': {
          width: 16,
          height: 16,
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#909090',
          backgroundClip: 'content-box',
          borderRadius: 8,
          border: '4px solid transparent',
        },
      }}
    />
  );
}
