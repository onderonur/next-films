import type { Id } from '@/core/shared/types';
import { CardLinkArea } from '@/core/ui/components/card';
import type { PersonListItem } from '@/features/people/types';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import { Box, Card, CardHeader, Skeleton } from '@mui/material';

type PersonCardShellProps = {
  personId?: Id;
  image: React.ReactNode;
  title: React.ReactNode;
};

function PersonCardShell({ personId, image, title }: PersonCardShellProps) {
  let content = (
    <>
      <Box sx={{ position: 'relative', aspectRatio: '2 / 3' }}>{image}</Box>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
        sx={{ padding: 1 }}
      />
    </>
  );

  if (personId) {
    content = (
      <CardLinkArea href={`/people/${personId}`}>{content}</CardLinkArea>
    );
  }

  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      {content}
    </Card>
  );
}

type PersonCardProps = {
  person: PersonListItem;
};

export function PersonCard({ person }: PersonCardProps) {
  return (
    <PersonCardShell
      personId={person.id}
      image={
        <TmdbImage
          src={person.profile_path}
          alt={person.name}
          fill
          sx={{ objectFit: 'cover' }}
        />
      }
      title={person.name}
    />
  );
}

export function PersonCardSkeleton() {
  return (
    <PersonCardShell
      image={<Skeleton variant="rounded" height="100%" />}
      title={<Skeleton />}
    />
  );
}
