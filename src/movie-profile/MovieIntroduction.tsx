import React from 'react';
import { Typography, Box, Grid, makeStyles } from '@material-ui/core';
import Rating from './Rating';
import { getMovieReleaseYear } from '@/common/CommonUtils';
import Introduction from '@/introduction/Introduction';
import MovieGenreChip from './MovieGenreChip';
import { Movie } from '@/common/CommonTypes';
import ImdbLink, { ImdbProfileType } from '../introduction/ImdbLink';

const useStyles = makeStyles((theme) => ({
  year: {
    color: theme.palette.text.secondary,
  },
  tagline: {
    fontStyle: 'italic',
  },
  genreChip: {
    margin: theme.spacing(0.5),
  },
  overview: {
    whiteSpace: 'pre-wrap',
  },
}));

interface MovieIntroductionProps {
  movie: Movie;
}

function MovieIntroduction({ movie }: MovieIntroductionProps) {
  const classes = useStyles();

  const releaseYear = getMovieReleaseYear(movie);

  if (!movie) {
    return null;
  }

  return (
    <Introduction
      backgroundImageSrc={movie.backdrop_path}
      imageSrc={movie.poster_path}
      title={
        <>
          <Typography variant="h5" gutterBottom={!movie.tagline}>
            {movie.title}
            {releaseYear && (
              <>
                {' '}
                <span className={classes.year}>{`(${getMovieReleaseYear(
                  movie,
                )})`}</span>
              </>
            )}
          </Typography>
          {movie.tagline && (
            <Typography
              className={classes.tagline}
              color="textSecondary"
              gutterBottom
            >
              {`"${movie.tagline}"`}
            </Typography>
          )}
        </>
      }
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Rating value={movie.vote_average * 10} />
                <Box marginLeft={2}>
                  <ImdbLink
                    type={ImdbProfileType.MOVIE}
                    imdbId={movie.imdb_id}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Genres
              </Typography>
              {movie.genres.map((genre) => (
                <MovieGenreChip
                  key={genre.id}
                  className={classes.genreChip}
                  genre={genre}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography className={classes.overview} variant="body2">
                {movie.overview}
              </Typography>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}

export default MovieIntroduction;
