import type { Omit } from '@/core/shared/types';
import type { LinkProps as MuiLinkProps } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

// https://mui.com/material-ui/guides/composition/#with-typescript
type NextLinkProps = Omit<
  MuiLinkProps<typeof Link, { component: typeof Link }>,
  'component'
>;

export const NextLink = forwardRef<
  React.ComponentRef<typeof Link>,
  NextLinkProps
>(function NextLink({ href, target, rel, ...rest }, ref) {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const isExternalUrl = !href.toString().startsWith('/');

  return (
    <MuiLink
      ref={ref}
      component={Link}
      underline="none"
      // To disable prefetch feature of next/link
      prefetch={false}
      href={href}
      target={isExternalUrl ? '_blank' : target}
      rel={isExternalUrl ? 'noopener noreferrer' : rel}
      {...rest}
    />
  );
});
