export type Maybe<T> = T | null | undefined;

export type Id = number;

export type DateString = string;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PaginationResponse<Data> = {
  results: Data[];
  page: number;
  total_pages: number;
  total_results: number;
};
