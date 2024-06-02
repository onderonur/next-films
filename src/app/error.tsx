'use client';

import { ErrorMessage } from '@/core/errors/components/error-message';
import { AppHeaderOffset } from '@/core/layouts/components/app-header';

type ErrorPageProps = {
  error: Error;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <AppHeaderOffset>
      <main>
        <ErrorMessage statusCode={500} message={error.message} />
      </main>
    </AppHeaderOffset>
  );
}
