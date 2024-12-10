import { getMetadata } from '@/core/seo/utils';
import { ImageGallery } from '@/features/media/components/image-gallery';
import { getPerson, getPersonImages } from '@/features/people/data';
import { getTmdbConfiguration } from '@/features/tmdb/data';
import { getTmdbImageUrl } from '@/features/tmdb/utils';
import { notFound } from 'next/navigation';

async function getPageData({
  personId,
  imagePath,
}: {
  personId: string;
  imagePath: string;
}) {
  const [person, images, tmdbConfiguration] = await Promise.all([
    getPerson(Number(personId)),
    getPersonImages(Number(personId)),
    getTmdbConfiguration(),
  ]);

  if (!person) notFound();

  const imageToView = images.find(
    (backdrop) => backdrop.file_path === `/${imagePath}`,
  );

  if (!imageToView) notFound();

  return { person, tmdbConfiguration, images, imageToView };
}

type PersonImagePageProps = {
  params: Promise<{
    personId: string;
    imagePath: string;
  }>;
};

export async function generateMetadata(props: PersonImagePageProps) {
  const { personId, imagePath } = await props.params;
  const { person, tmdbConfiguration, imageToView } = await getPageData({
    personId,
    imagePath,
  });

  return getMetadata({
    title: `Images of "${person.name}"`,
    description: `Explore images of "${person.name}"`,
    pathname: `/people/${personId}/images/${imagePath}`,
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: imageToView.file_path,
        }),
        alt: `Image of "${person.name}"`,
      },
    ],
  });
}

export default async function PersonImagePage(props: PersonImagePageProps) {
  const { personId, imagePath } = await props.params;
  const { person, images, imageToView } = await getPageData({
    personId,
    imagePath,
  });

  return (
    <ImageGallery
      mediaCardHeaderProps={{
        title: `Images of "${person.name}"`,
        subheader: person.name,
        href: `/people/${person.id}`,
        imageSrc: person.profile_path,
      }}
      imageToView={{ ...imageToView, alt: `Image of "${person.name}"` }}
      images={images}
      imagePagePathTemplate={`/people/${person.id}/images/%imagePath%`}
      listItemProps={{
        aspectRatio: '2 / 3',
      }}
    />
  );
}
