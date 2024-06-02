import type { Maybe } from '@/core/shared/types';
import type { SxProps, Theme } from '@mui/material';

export function lineClamp(maxLines: number) {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLines,
    overflow: 'hidden',
  };
}

export function mergeSx(...sxProps: Array<Maybe<SxProps<Theme> | false>>) {
  const result: SxProps<Theme>[] = [];

  for (const sx of sxProps) {
    if (!sx) continue;

    // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
    // https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
    if (Array.isArray(sx)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      result.push(...sx);
    } else {
      result.push(sx);
    }
  }

  return result as SxProps<Theme>;
}

export function responsiveBorderRadius() {
  const borderRadius = '0.25rem';
  const totalHorizontalSpace = '0px';

  return {
    borderRadius: `max(0px, min(${borderRadius}, calc((100vw - ${totalHorizontalSpace} - 100%) * 9999))) / ${borderRadius}`,
  };
}
