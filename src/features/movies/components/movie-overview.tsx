import { lineClamp } from '@/core/theme/utils';
import { Typography } from '@mui/material';

type MovieOverviewProps = {
  text: string;
  maxLines?: number;
};

export function MovieOverview({ text, maxLines }: MovieOverviewProps) {
  return (
    <Typography
      component="p"
      sx={[
        !!maxLines && lineClamp(maxLines),
        {
          typography: { xs: 'body2', md: 'h6' },
          fontWeight: { md: 'regular' },
          whiteSpace: 'pre-wrap',
        },
      ]}
    >
      {text}
    </Typography>
  );
}
