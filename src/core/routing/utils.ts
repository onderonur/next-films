import { notFound } from 'next/navigation';
import type { z } from 'zod';
import type { Maybe } from '../shared/types';
import type { SearchParams } from './types';

export function createUrl(pathname: string, searchParams?: URLSearchParams) {
  const searchParamsString = searchParams?.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : '';
  return `${pathname}${queryString}`;
}

export function parseSearchParams<Output, Def extends z.ZodTypeDef, Input>({
  searchParamsSchema,
  searchParams,
}: {
  searchParamsSchema: z.ZodSchema<Output, Def, Input>;
  searchParams: SearchParams;
}) {
  const result = searchParamsSchema.safeParse(searchParams);
  if (!result.success) notFound();
  return result.data;
}

function isNonEmptyValue<Value extends string | number>(
  value: Value | null | undefined,
): value is Value {
  return value !== null && value !== undefined && value !== '';
}

export function parseObjectToSearchParams(
  searchParams: Maybe<
    Record<string, string | string[] | number | undefined | null>
  >,
) {
  const parsedSearchParams = new URLSearchParams();

  if (!searchParams) return parsedSearchParams;

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const valueItem of value) {
        if (isNonEmptyValue(valueItem)) {
          parsedSearchParams.append(key, valueItem);
        }
      }

      continue;
    }

    if (isNonEmptyValue(value)) {
      parsedSearchParams.append(key, value.toString());
    }
  }

  return parsedSearchParams;
}
