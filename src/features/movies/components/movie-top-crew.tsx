import type { Id } from '@/core/shared/types';
import { ListItemLink } from '@/core/ui/components/list-item-link';
import { Title } from '@/core/ui/components/title';
import { getMovieCredits } from '@/features/movies/data';
import { TmdbAvatar } from '@/features/tmdb/components/tmdb-avatar';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type MovieTopCrewShellProps = {
  children: React.ReactNode;
};

function MovieTopCrewShell({ children }: MovieTopCrewShellProps) {
  return (
    <section>
      <Title level={2} title="Top Crew" sx={visuallyHidden} />
      {children}
    </section>
  );
}

type MovieTopCrewProps = {
  movieId: Id;
};

export async function MovieTopCrew({ movieId }: MovieTopCrewProps) {
  const credits = await getMovieCredits(movieId);
  const filteredCrew = credits.crew.filter((crew) => crew.job === 'Director');

  if (!filteredCrew.length) return null;

  return (
    <MovieTopCrewShell>
      <List
        disablePadding
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {filteredCrew.map((crewPerson) => {
          const allJobs = credits.crew
            .filter((crew) => crew.id === crewPerson.id)
            .map((crewInfoOfPerson) => crewInfoOfPerson.job);

          return (
            <ListItem
              key={crewPerson.id}
              disablePadding
              dense
              sx={{
                width: 'auto',
                border: 1,
                borderRadius: 2,
                borderColor: 'divider',
              }}
            >
              <ListItemLink href={`/people/${crewPerson.id}`}>
                <ListItemAvatar>
                  <TmdbAvatar
                    src={crewPerson.profile_path}
                    alt={crewPerson.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={crewPerson.name}
                  secondary={allJobs.join(', ')}
                />
              </ListItemLink>
            </ListItem>
          );
        })}
      </List>
    </MovieTopCrewShell>
  );
}

export function MovieTopCrewSkeleton() {
  return (
    <MovieTopCrewShell>
      <Skeleton variant="rounded" width="12.5rem" height="3.75rem" />
    </MovieTopCrewShell>
  );
}
