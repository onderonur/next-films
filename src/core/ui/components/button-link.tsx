'use client';

import { NextLink } from '@/core/routing/components/next-link';
import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';

type ButtonLinkProps = ButtonProps<
  typeof NextLink,
  { component?: typeof NextLink }
>;

export function ButtonLink(props: ButtonLinkProps) {
  return <Button<typeof NextLink> {...props} component={NextLink} />;
}
