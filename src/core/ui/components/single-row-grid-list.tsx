import { Box, Typography } from '@mui/material';
import { Children } from 'react';

type SingleRowGridListProps = {
  itemWidth: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  children: React.ReactNode;
};

export function SingleRowGridList({
  itemWidth,
  children,
}: SingleRowGridListProps) {
  if (!Children.count(children)) {
    return <Typography>Nothing has been found</Typography>;
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          padding: 0,
          paddingBottom: 1,
          margin: 0,
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: itemWidth,
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
