import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

export type BaseImageProps = ImageProps & {
  sx?: SxProps<Theme>;
};

export function BaseImage({ src, ...rest }: BaseImageProps) {
  return <Box component={Image} src={src || '/placeholder.png'} {...rest} />;
}
