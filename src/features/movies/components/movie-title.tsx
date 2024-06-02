import type { Maybe } from '@/core/shared/types';
import { Typography } from '@mui/material';

type MovieTitleProps = {
  component?: keyof React.JSX.IntrinsicElements;
  title: string;
  subtitle?: Maybe<string>;
};

export function MovieTitle({
  component = 'p',
  title,
  subtitle,
}: MovieTitleProps) {
  return (
    <div>
      <Typography
        component={component}
        sx={{
          typography: { xs: 'h4', md: 'h3' },
          fontWeight: { xs: 'bold', md: 'bold' },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            color: 'text.secondary',
            typography: { md: 'h6' },
            fontWeight: { xs: 'medium', md: 'medium' },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
}
