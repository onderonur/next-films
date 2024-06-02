export enum MediaType {
  MOVIE = 'movie',
  PERSON = 'person',
}

export function getYouTubeThumbnailUrl(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
}
