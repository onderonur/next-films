import type { Id } from '@/core/shared/types';
import { createMockArray } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import {
  SeeAllLink,
  SeeAllLinkSkeleton,
} from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import { Title } from '@/core/ui/components/title';
import {
  ImageCard,
  ImageCardSkeleton,
} from '@/features/media/components/image-card';
import { getMovieImages } from '@/features/movies/data';

type MovieImagesShellProps = {
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

function MovieImagesShell({ seeAllLink, children }: MovieImagesShellProps) {
  return (
    <section>
      <Padder>
        <Title level={2} title="Images" extra={seeAllLink} />
        <SingleRowGridList itemWidth={{ xs: '16rem', sm: '20rem' }}>
          {children}
        </SingleRowGridList>
      </Padder>
    </section>
  );
}

type MovieImagesProps = {
  movieId: Id;
};

export async function MovieImages({ movieId }: MovieImagesProps) {
  const images = await getMovieImages(movieId);

  if (!images.length) return null;

  const [firstImage] = images;

  return (
    <MovieImagesShell
      seeAllLink={
        <SeeAllLink
          href={`/movies/${movieId}/images/${firstImage.file_path}`}
        />
      }
    >
      {images.slice(0, 10).map((image, i) => {
        return (
          <li key={image.file_path}>
            <ImageCard
              href={`/movies/${movieId}/images${image.file_path}`}
              imageSrc={image.file_path}
              alt={`Image - ${i + 1}`}
              aspectRatio="16 / 9"
            />
          </li>
        );
      })}
    </MovieImagesShell>
  );
}

export function MovieImagesSkeleton() {
  return (
    <MovieImagesShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(10).map((key) => {
        return (
          <li key={key}>
            <ImageCardSkeleton aspectRatio="16 / 9" />
          </li>
        );
      })}
    </MovieImagesShell>
  );
}
