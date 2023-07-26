import { ID } from '@/common/CommonTypes';
import TmdbAvatar from '@/tmdb/tmdb-avatar';
import { getMovieDetails } from '@/movies/movie-fetchers';
import NextLink from '@/routing/next-link';
import { CardHeader, Typography } from '@mui/material';

type MediaCardHeaderProps = {
  title: string;
  movieId: ID;
};

export default async function MediaCardHeader({
  title,
  movieId,
}: MediaCardHeaderProps) {
  // Colocation mı olmalı yoksa prop drilling mi bi bak örneklere vs.
  const movie = await getMovieDetails(movieId);

  // TODO: Semantic yapı fix'lenebilir burada heading, link vs vs.
  return (
    <CardHeader
      avatar={
        <NextLink href={`/movies/${movieId}`}>
          <TmdbAvatar src={movie.poster_path} alt={movie.title} />
        </NextLink>
      }
      title={title}
      titleTypographyProps={{
        variant: 'h6',
        component: 'h1',
      }}
      subheader={
        <Typography component="h2" sx={{ color: 'text.secondary' }}>
          <NextLink href={`/movies/${movieId}`}>{movie.title}</NextLink>
        </Typography>
      }
    />
  );
}