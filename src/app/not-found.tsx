import { ErrorMessage } from '@/core/errors/components/error-message';
import { AppHeaderOffset } from '@/core/layouts/components/app-header';

export default function NotFoundPage() {
  return (
    <AppHeaderOffset>
      <main>
        <ErrorMessage statusCode={404} message="Not Found" />
      </main>
    </AppHeaderOffset>
  );
}
