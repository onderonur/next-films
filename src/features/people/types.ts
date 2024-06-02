import type { DateString, Id, Maybe } from '@/core/shared/types';
import type { MovieListItem } from '@/features/movies/types';

export type PersonBase = {
  id: Id;
  name: string;
  profile_path: string;
  adult: boolean;
  popularity: number;
  known_for_department: string;
};

export type PersonListItem = PersonBase & {
  known_for: MovieListItem[];
};

export type PersonCasting = MovieListItem & { character: string };
export type PersonCrew = MovieListItem & { job: string };

export type PersonDetails = PersonBase & {
  biography: Maybe<string>;
  birthday: DateString;
  place_of_birth: string;
  official_site: Maybe<string>;
  also_known_as: Maybe<string[]>;
  imdb_id: Maybe<string>;
};
