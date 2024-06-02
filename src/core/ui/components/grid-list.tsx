import { Box, Typography } from '@mui/material';
import { Children } from 'react';

const spacing = 1;

export type GridListProps = {
  listEmptyMessage?: string;
  children: React.ReactNode;
};

export function GridList({
  listEmptyMessage = 'Nothing has been found',
  children,
}: GridListProps) {
  if (!Children.count(children)) {
    return listEmptyMessage && <Typography>{listEmptyMessage}</Typography>;
  }

  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        columnGap: spacing,
        rowGap: spacing * 3,
        gridTemplateColumns: {
          xs: `repeat(auto-fill, minmax(min(100%, 9rem), 1fr))`,
          md: `repeat(auto-fill, minmax(min(100%, 12rem), 1fr))`,
        },
        margin: 0,
      }}
    >
      {children}
    </Box>
  );
}
