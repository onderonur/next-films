import { Typography, Stack, Box, Card, CardMedia } from '@mui/material';
import { PersonListItem } from '@/people/people-types';
import PersonalInfo from './personal-info';
import TmdbImage from '@/tmdb/tmdb-image';
import SectionTitle from '@/common/section-title';

type PersonSummaryProps = {
  person: PersonListItem;
};

export default function PersonSummary({ person }: PersonSummaryProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Card sx={{ flexBasis: '18rem' }}>
        <CardMedia
          sx={{ position: 'relative', width: '100%', aspectRatio: '2 / 3' }}
        >
          <TmdbImage
            src={person.profile_path}
            alt={person.name}
            fill
            sx={{ objectFit: 'cover' }}
            priority
          />
        </CardMedia>
      </Card>

      <Box sx={{ flexBasis: '75ch' }}>
        <Stack spacing={1}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {person.name}
          </Typography>
          {person.biography && (
            <section>
              <SectionTitle title="Biography" />
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                }}
              >
                {person.biography}
              </Typography>
            </section>
          )}
          <section>
            <SectionTitle title="Personal Info" />
            <PersonalInfo person={person} />
          </section>
        </Stack>
      </Box>
    </Box>
  );
}
