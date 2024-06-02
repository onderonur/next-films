import { BaseImage } from '@/core/ui/components/base-image';
import type { AvatarProps } from '@mui/material';
import { Avatar } from '@mui/material';

export type BaseAvatarProps = AvatarProps & {
  alt: string;
};

export function BaseAvatar({ src, alt, ...rest }: BaseAvatarProps) {
  return (
    <Avatar {...rest}>
      {src && (
        <BaseImage src={src} alt={alt} fill sx={{ objectFit: 'cover' }} />
      )}
    </Avatar>
  );
}
