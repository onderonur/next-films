import { YouTubeEmbed } from '@next/third-parties/google';

type YouTubePlayerProps = {
  youTubeId: string;
};

export function YouTubePlayer({ youTubeId }: YouTubePlayerProps) {
  return <YouTubeEmbed videoid={youTubeId} style="max-width: none" />;
}
