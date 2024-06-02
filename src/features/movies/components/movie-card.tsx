import type { Id } from '@/core/shared/types';
import { lineClamp } from '@/core/theme/utils';
import { CardLinkArea } from '@/core/ui/components/card';
import { MovieRating } from '@/features/movies/components/movie-rating';
import type { MovieBase } from '@/features/movies/types';
import { getMovieReleaseYear } from '@/features/movies/utils';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from '@mui/material';

type MovieCardShellProps = {
  movieId?: Id;
  image: React.ReactNode;
  title: React.ReactNode;
  subheader?: React.ReactNode;
  bottom: React.ReactNode;
};

function MovieCardShell({
  movieId,
  image,
  title,
  subheader,
  bottom,
}: MovieCardShellProps) {
  let content = (
    <>
      <Box sx={{ position: 'relative', aspectRatio: '2 / 3' }}>{image}</Box>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: 'body2',
          fontWeight: 'bold',
          sx: {
            ...lineClamp(2),
            wordBreak: 'break-word',
            minHeight: '2lh',
          },
        }}
        subheader={subheader}
        subheaderTypographyProps={{
          variant: 'subtitle2',
        }}
        sx={{ padding: 1, paddingBottom: 0.25 }}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: 1,
          paddingTop: 0,
          paddingBottom: 1,
        }}
      >
        {bottom}
      </CardContent>
    </>
  );

  if (movieId) {
    content = (
      <CardLinkArea href={`/movies/${movieId}`}>{content}</CardLinkArea>
    );
  }

  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      {content}
    </Card>
  );
}

type MovieCardProps = {
  movie: MovieBase;
  subheader?: string;
};

export function MovieCard({ movie, subheader }: MovieCardProps) {
  return (
    <MovieCardShell
      movieId={movie.id}
      image={
        <TmdbImage
          src={movie.poster_path}
          alt={movie.title}
          fill
          sx={{ objectFit: 'cover' }}
        />
      }
      title={movie.title}
      subheader={subheader}
      bottom={
        <>
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ color: 'text.secondary' }}
          >
            {getMovieReleaseYear(movie)}
          </Typography>
          <MovieRating movie={movie} sx={{ typography: 'subtitle2' }} />
        </>
      }
    />
  );
}

export function MovieCardSkeleton() {
  return (
    <MovieCardShell
      image={<Skeleton variant="rounded" height="100%" />}
      title={
        <div>
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      }
      bottom={
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          <Skeleton width="4ch" />
        </Typography>
      }
    />
  );
}
