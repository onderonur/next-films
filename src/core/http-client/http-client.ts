import { createUrl } from '@/core/routing/utils';

type ApiErrorData = {
  status_message: string;
};

async function handleResponse<Data>(response: Response): Promise<Data> {
  if (response.ok) {
    const data = (await response.json()) as Data;
    return data;
  }

  let message = response.statusText;

  try {
    const errorJson = (await response.json()) as ApiErrorData;
    message = errorJson.status_message;
    // eslint-disable-next-line no-empty
  } catch {}

  throw new Error(message);
}

export const httpClient = {
  get: async <Data>(
    url: string,
    searchParams?: URLSearchParams,
  ): Promise<Data> => {
    const fullUrl = createUrl(url, searchParams);
    const response = await fetch(fullUrl, {
      // TODO: Remove after migrating to Next.js v15
      cache: 'no-store',
    });
    const data = await handleResponse<Data>(response);
    return data;
  },
};
