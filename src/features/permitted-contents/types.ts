import type { Maybe } from '@/core/shared/types';
import type { MovieListItem } from '@/features/movies/types';

export type PermittedMovie = {
  title: string;
  overview: string;
  release_date: string;
  adult: boolean;
  vote_count: number;
  popularity: number;
};

export type PermittedPerson = {
  name: string;
  profile_path: Maybe<string>;
  adult: boolean;
  popularity: number;
  biography?: Maybe<string>;
  known_for?: MovieListItem[];
};
