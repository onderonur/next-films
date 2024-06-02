'use client';

import { NextLink } from '@/core/routing/components/next-link';
import type { ListItemButtonProps } from '@mui/material';
import { ListItemButton } from '@mui/material';

type ListItemLinkProps = ListItemButtonProps<
  typeof NextLink,
  { component?: typeof NextLink }
>;

export function ListItemLink(props: ListItemLinkProps) {
  return <ListItemButton {...props} component={NextLink} />;
}
