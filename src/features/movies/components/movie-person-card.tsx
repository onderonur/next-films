import type { Id } from '@/core/shared/types';
import { lineClamp } from '@/core/theme/utils';
import { CardLinkArea } from '@/core/ui/components/card';
import { TmdbAvatar } from '@/features/tmdb/components/tmdb-avatar';
import type { CardHeaderProps } from '@mui/material';
import { Card, CardHeader, CardMedia, Skeleton } from '@mui/material';

type MoviePersonCardHeaderProps = Pick<
  CardHeaderProps,
  'title' | 'subheader' | 'sx'
>;

function MoviePersonCardHeader(props: MoviePersonCardHeaderProps) {
  return (
    <CardHeader
      titleTypographyProps={{
        variant: 'body2',
        fontWeight: 'bold',
      }}
      subheaderTypographyProps={{
        variant: 'subtitle2',
        sx: lineClamp(2),
      }}
      {...props}
    />
  );
}

type MoviePersonCardProps = {
  personId: Id;
  imageSrc: string;
  title: string;
  subheader: string;
};

export function MoviePersonCard({
  personId,
  imageSrc,
  title,
  subheader,
}: MoviePersonCardProps) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent', textAlign: 'center' }}>
      <CardLinkArea href={`/people/${personId}`}>
        <CardMedia
          sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}
        >
          <TmdbAvatar
            src={imageSrc}
            alt={title}
            sx={{ width: 82, height: 82 }}
          />
        </CardMedia>
        <MoviePersonCardHeader title={title} subheader={subheader} />
      </CardLinkArea>
    </Card>
  );
}

export function MoviePersonCardSkeleton() {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent', textAlign: 'center' }}>
      <CardMedia sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}>
        <Skeleton variant="circular" width={82} height={82} />
      </CardMedia>
      <MoviePersonCardHeader
        title={<Skeleton width="50%" sx={{ marginX: 'auto' }} />}
        subheader={<Skeleton width="30%" sx={{ marginX: 'auto' }} />}
      />
    </Card>
  );
}
