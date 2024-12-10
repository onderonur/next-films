import { getMetadata } from '@/core/seo/utils';
import { ImageGallery } from '@/features/media/components/image-gallery';
import { getMovie, getMovieImages } from '@/features/movies/data';
import { getTmdbConfiguration } from '@/features/tmdb/data';
import { getTmdbImageUrl } from '@/features/tmdb/utils';
import { notFound } from 'next/navigation';

async function getPageData({
  movieId,
  imagePath,
}: {
  movieId: string;
  imagePath: string;
}) {
  const [movie, images, tmdbConfiguration] = await Promise.all([
    getMovie(Number(movieId)),
    getMovieImages(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie) notFound();

  const imageToView = images.find(
    (backdrop) => backdrop.file_path === `/${imagePath}`,
  );

  if (!imageToView) notFound();

  return { movie, tmdbConfiguration, images, imageToView };
}

type MovieImagePageProps = {
  params: Promise<{
    movieId: string;
    imagePath: string;
  }>;
};

export async function generateMetadata(props: MovieImagePageProps) {
  const { movieId, imagePath } = await props.params;
  const { movie, tmdbConfiguration, imageToView } = await getPageData({
    movieId,
    imagePath,
  });

  return getMetadata({
    title: `Images of "${movie.title}"`,
    description: `Explore images of "${movie.title}"`,
    pathname: `/movies/${movieId}/images/${imagePath}`,
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: imageToView.file_path,
        }),
        alt: `Image of "${movie.title}"`,
      },
    ],
  });
}

export default async function MovieImagePage(props: MovieImagePageProps) {
  const { movieId, imagePath } = await props.params;
  const { movie, images, imageToView } = await getPageData({
    movieId,
    imagePath,
  });

  return (
    <ImageGallery
      mediaCardHeaderProps={{
        title: `Images of "${movie.title}"`,
        subheader: movie.title,
        href: `/movies/${movie.id}`,
        imageSrc: movie.poster_path,
      }}
      imageToView={{ ...imageToView, alt: `Image of "${movie.title}"` }}
      images={images}
      imagePagePathTemplate={`/movies/${movie.id}/images/%imagePath%`}
      listItemProps={{
        aspectRatio: '16 / 9',
      }}
    />
  );
}
