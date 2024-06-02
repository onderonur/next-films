import { AppHeaderOffset } from '@/core/layouts/components/app-header';
import { NextLink } from '@/core/routing/components/next-link';
import type { CardHeaderWithAvatarProps } from '@/core/ui/components/card';
import { CardHeaderWithAvatar } from '@/core/ui/components/card';
import { ListItemLink } from '@/core/ui/components/list-item-link';
import { Padder } from '@/core/ui/components/padder';
import type { ImageInfo } from '@/features/media/types';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListSubheader,
} from '@mui/material';

type ImageGalleryNavigationLinkProps = {
  href: string;
  direction: 'previous' | 'next';
};

function ImageGalleryNavigationLink({
  href,
  direction,
}: ImageGalleryNavigationLinkProps) {
  const iconsByDirection = {
    previous: ChevronLeftOutlinedIcon,
    next: ChevronRightOutlinedIcon,
  };

  const Icon = iconsByDirection[direction];

  const ariaLabelsByDirection = {
    previous: 'Previous image',
    next: 'Next image',
  };

  return (
    <NextLink
      href={href}
      aria-label={ariaLabelsByDirection[direction]}
      sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        '& > .MuiBox-root': {
          transitionProperty: 'transform, opacity',
          transitionDuration: '100ms',
          transitionTimingFunction: 'ease-out',
        },
        '&:hover > :is(.MuiBox-root, .MuiSvgIcon-root)': {
          opacity: 0.8,
          transform: 'scale(1.15)',
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.dark',
          opacity: 0.6,
          borderRadius: '50%',
          display: 'flex',
          padding: 1,
        }}
      >
        <Icon color="action" />
      </Box>
    </NextLink>
  );
}

type ImageGalleryProps = {
  mediaCardHeaderProps: CardHeaderWithAvatarProps;
  imageToView: ImageInfo & { alt: string };
  images: ImageInfo[];
  imagePagePathTemplate: string;
  listItemProps: {
    aspectRatio: string;
  };
};

export function ImageGallery({
  mediaCardHeaderProps,
  imageToView,
  images,
  imagePagePathTemplate,
  listItemProps,
}: ImageGalleryProps) {
  const imageToViewIndex = images.findIndex(
    (image) => image.file_path === imageToView.file_path,
  );

  const previousImage = images[imageToViewIndex - 1];
  const nextImage = images[imageToViewIndex + 1];

  function getImagePagePath(imagePath: string) {
    return imagePagePathTemplate.replace(
      '%imagePath%',
      imagePath.replace('/', ''),
    );
  }

  return (
    <AppHeaderOffset>
      <Padder disableMobilePadding>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { md: '1fr', lg: '1fr 23rem' },
            alignItems: 'start',
          }}
        >
          <Card component="main">
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
              }}
            >
              <TmdbImage
                src={imageToView.file_path}
                alt={imageToView.alt}
                tmdbImageQuality="original"
                fill
                sx={{ objectFit: 'contain' }}
                priority
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                }}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {previousImage && (
                  <ImageGalleryNavigationLink
                    href={getImagePagePath(previousImage.file_path)}
                    direction="previous"
                  />
                )}
                <Box sx={{ flex: 1 }} />
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {nextImage && (
                  <ImageGalleryNavigationLink
                    href={getImagePagePath(nextImage.file_path)}
                    direction="next"
                  />
                )}
              </Box>
            </Box>
            <CardHeaderWithAvatar {...mediaCardHeaderProps} />
          </Card>
          <Card component="aside">
            <CardHeader
              title="Images"
              titleTypographyProps={{
                variant: 'h6',
                component: 'h2',
                fontWeight: 'bold',
              }}
            />
            <List
              sx={{
                overflow: { lg: 'auto' },
                maxHeight: { lg: '75vh' },
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
                gap: 0.5,
              }}
              subheader={
                <ListSubheader sx={{ gridColumn: '1 / -1' }}>
                  {images.length} Image(s)
                </ListSubheader>
              }
            >
              {images.map((image, i) => {
                return (
                  <ListItem key={image.file_path} disablePadding>
                    <ListItemLink
                      selected={image.file_path === imageToView.file_path}
                      href={getImagePagePath(image.file_path)}
                      sx={{
                        position: 'relative',
                        aspectRatio: listItemProps.aspectRatio,
                        borderRadius: 1,
                        overflow: 'hidden',
                        '&.Mui-selected': {
                          border: 4,
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <TmdbImage
                        src={image.file_path}
                        alt={`Image no: ${i + 1}`}
                        fill
                        sx={{ objectFit: 'cover' }}
                      />
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Box>
      </Padder>
    </AppHeaderOffset>
  );
}
