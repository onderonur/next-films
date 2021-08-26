import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import NextLink from '@/routing/NextLink';
import useRouterPath from '@/routing/useRouterPath';
import { MovieVideo } from '@/media-gallery/MediaGalleryTypes';

interface MovieVideoListItemProps {
  video: MovieVideo;
}

function MovieVideoListItem({ video }: MovieVideoListItemProps) {
  const { asHref } = useRouterPath();
  return (
    <ListItem
      button
      dense
      component={NextLink}
      href={`${asHref}?watch=${video.key}`}
      shallow
    >
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItem>
  );
}

export default MovieVideoListItem;
