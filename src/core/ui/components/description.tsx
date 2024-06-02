import type { Maybe } from '@/core/shared/types';
import { Box, Typography } from '@mui/material';

type DescriptionListProps = {
  children: React.ReactNode;
};

export function DescriptionList({ children }: DescriptionListProps) {
  return (
    <Box component="dl" sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {children}
    </Box>
  );
}

type DescriptionProps = {
  term: string;
  details: Maybe<string>;
};

export function Description({ term, details }: DescriptionProps) {
  if (!details) return null;

  return (
    <div>
      <Typography
        component="dt"
        sx={{
          fontWeight: 'bold',
          color: 'text.secondary',
        }}
      >
        {term}
      </Typography>
      <Typography component="dd" variant="body2">
        {details}
      </Typography>
    </div>
  );
}
