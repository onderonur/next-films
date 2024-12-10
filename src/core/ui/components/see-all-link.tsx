import { Skeleton } from '@mui/material';
import { ButtonLink } from './button-link';

type SeeAllLinkProps = { href: string };

export function SeeAllLink({ href }: SeeAllLinkProps) {
  return (
    <ButtonLink href={href} variant="outlined" size="small">
      See all
    </ButtonLink>
  );
}

export function SeeAllLinkSkeleton() {
  return <Skeleton width={68} sx={{ fontSize: '2rem' }} />;
}
