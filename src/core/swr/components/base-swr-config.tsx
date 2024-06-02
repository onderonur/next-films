'use client';

import { httpClient } from '@/core/http-client/http-client';
import { SWRConfig } from 'swr';

type BaseSWRConfigProps = {
  children: React.ReactNode;
};

export function BaseSWRConfig({ children }: BaseSWRConfigProps) {
  return (
    <SWRConfig
      value={{
        fetcher: httpClient.get,
      }}
    >
      {children}
    </SWRConfig>
  );
}
