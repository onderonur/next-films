import type { Id } from '@/core/shared/types';
import { createMockArray } from '@/core/shared/utils';
import { lineClamp } from '@/core/theme/utils';
import { BaseImage } from '@/core/ui/components/base-image';
import { CardLinkArea } from '@/core/ui/components/card';
import { Padder } from '@/core/ui/components/padder';
import {
  SeeAllLink,
  SeeAllLinkSkeleton,
} from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import { Title } from '@/core/ui/components/title';
import { getYouTubeThumbnailUrl } from '@/features/media/utils';
import { getMovieVideos } from '@/features/movies/data';
import type { MovieVideo } from '@/features/movies/types';
import type { CardHeaderProps } from '@mui/material';
import { Card, CardHeader, CardMedia, Skeleton } from '@mui/material';

type MovieVideoCardHeaderProps = Pick<CardHeaderProps, 'title' | 'subheader'>;

function MovieVideoCardHeader(props: MovieVideoCardHeaderProps) {
  return (
    <CardHeader
      titleTypographyProps={{
        sx: {
          ...lineClamp(2),
          typography: { xs: 'body2', md: 'body1' },
          fontWeight: { xs: 'bold', md: 'bold' },
        },
      }}
      subheaderTypographyProps={{
        variant: 'subtitle2',
      }}
      sx={{ padding: 1 }}
      {...props}
    />
  );
}

type MovieVideoProps = {
  movieId: Id;
  video: MovieVideo;
};

function MovideVideoCard({ movieId, video }: MovieVideoProps) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardLinkArea href={`/movies/${movieId}/videos/${video.id}`}>
        <CardMedia sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
          <BaseImage
            src={getYouTubeThumbnailUrl(video.key)}
            alt={video.name}
            sx={{ objectFit: 'cover' }}
            fill
          />
        </CardMedia>
        <MovieVideoCardHeader title={video.name} subheader={video.type} />
      </CardLinkArea>
    </Card>
  );
}

function MovieVideoCardSkeleton() {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardMedia sx={{ aspectRatio: '16 / 9' }}>
        <Skeleton variant="rounded" height="100%" />
      </CardMedia>
      <MovieVideoCardHeader
        title={<Skeleton />}
        subheader={<Skeleton width="60%" />}
      />
    </Card>
  );
}

type MovieVideosShellProps = {
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

function MovieVideosShell({ seeAllLink, children }: MovieVideosShellProps) {
  return (
    <section>
      <Padder>
        <Title level={2} title="Videos" extra={seeAllLink} />
        <SingleRowGridList itemWidth={{ xs: '16rem', md: '20rem' }}>
          {children}
        </SingleRowGridList>
      </Padder>
    </section>
  );
}

type MovieVideosProps = {
  movieId: Id;
};

export async function MovieVideos({ movieId }: MovieVideosProps) {
  const videos = await getMovieVideos(movieId);

  if (!videos.length) return null;

  const [firstVideo] = videos;

  return (
    <MovieVideosShell
      seeAllLink={
        <SeeAllLink href={`/movies/${movieId}/videos/${firstVideo.id}`} />
      }
    >
      {videos.slice(0, 10).map((video) => {
        return (
          <li key={video.id}>
            <MovideVideoCard movieId={movieId} video={video} />
          </li>
        );
      })}
    </MovieVideosShell>
  );
}

export function MovieVideosSkeleton() {
  return (
    <MovieVideosShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(4).map((key) => {
        return (
          <li key={key}>
            <MovieVideoCardSkeleton />
          </li>
        );
      })}
    </MovieVideosShell>
  );
}
