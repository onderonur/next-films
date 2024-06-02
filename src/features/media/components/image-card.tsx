import { CardLinkArea } from '@/core/ui/components/card';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import { Card, CardMedia, Skeleton } from '@mui/material';

type ImageCardProps = {
  href: string;
  imageSrc: string;
  alt: string;
  aspectRatio: string;
};

export function ImageCard({
  href,
  imageSrc,
  alt,
  aspectRatio,
}: ImageCardProps) {
  return (
    <Card>
      <CardLinkArea href={href}>
        <CardMedia sx={{ position: 'relative', aspectRatio }}>
          <TmdbImage
            src={imageSrc}
            alt={alt}
            fill
            sx={{ objectFit: 'cover', borderRadius: 1 }}
          />
        </CardMedia>
      </CardLinkArea>
    </Card>
  );
}

type ImageCardSkeletonProps = {
  aspectRatio: string;
};

export function ImageCardSkeleton({ aspectRatio }: ImageCardSkeletonProps) {
  return (
    <Card>
      <CardMedia sx={{ aspectRatio }}>
        <Skeleton variant="rounded" height="100%" />
      </CardMedia>
    </Card>
  );
}
