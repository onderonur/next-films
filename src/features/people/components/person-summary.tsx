import { Description, DescriptionList } from '@/core/ui/components/description';
import { Title } from '@/core/ui/components/title';
import type { PersonDetails } from '@/features/people/types';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import { Box, Card, CardMedia, Stack, Typography } from '@mui/material';

type PersonSummaryProps = {
  person: PersonDetails;
};

export function PersonSummary({ person }: PersonSummaryProps) {
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
              <Title level={2} title="Biography" />
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
            <Title level={2} title="Person Info" />
            <DescriptionList>
              <Description term="Birthday" details={person.birthday} />
              <Description
                term="Place of Birth"
                details={person.place_of_birth}
              />
              <Description
                term="Official Site"
                details={person.official_site}
              />
            </DescriptionList>
          </section>
        </Stack>
      </Box>
    </Box>
  );
}
