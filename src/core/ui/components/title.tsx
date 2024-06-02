import { mergeSx } from '@/core/theme/utils';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

type TitleProps = {
  title: string;
  level: 1 | 2;
  extra?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export function Title({ title, level, extra, sx }: TitleProps) {
  const isPageTitle = level === 1;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        marginBottom: 2,
      }}
    >
      <Typography
        variant={isPageTitle ? 'h5' : 'h6'}
        component={isPageTitle ? 'h1' : 'h2'}
        sx={mergeSx({ fontWeight: 'bold' }, sx)}
      >
        {title}
      </Typography>
      {extra && <div>{extra}</div>}
    </Box>
  );
}
