import type { Maybe } from '@/core/shared/types';
import { APP_TITLE } from '@/core/shared/utils';
import type { Metadata } from 'next';

const APP_DESCRIPTION = `${APP_TITLE} is a client application for TMDb API. It's created with Next.js.`;

export function getMetadata({
  title,
  description,
  pathname,
  images,
}: {
  title?: string;
  description?: Maybe<string>;
  pathname?: string;
  images?: NonNullable<Metadata['openGraph']>['images'];
}): Metadata {
  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const metaDescription = description ?? APP_DESCRIPTION;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(process.env.BASE_URL as string),
    creator: 'Onur Önder',
    applicationName: APP_TITLE,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      locale: 'en_US',
      url: pathname,
      siteName: APP_TITLE,
      images,
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      card: 'summary_large_image',
      creator: '@onderonur_',
      images,
    },
  };
}
