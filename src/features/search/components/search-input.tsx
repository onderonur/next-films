import { createUrl } from '@/core/routing/utils';
import { Search } from '@mui/icons-material';
import type { SxProps, Theme } from '@mui/material';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchInputProps = {
  autoFocus?: boolean;
  sx?: SxProps<Theme>;
};

export function SearchInput({ autoFocus }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.trim();

  return (
    <OutlinedInput
      type="search"
      sx={{ maxWidth: 'sm', width: '100%' }}
      size="small"
      placeholder="Search Movies & People"
      autoFocus={autoFocus}
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      defaultValue={query ?? ''}
      onChange={(e) => {
        const trimmedValue = e.target.value.trim();

        if (!trimmedValue) {
          router.push('/');
          return;
        }

        const newSearchParams = new URLSearchParams();
        newSearchParams.set('query', trimmedValue);
        const url = createUrl('/search', newSearchParams);

        if (pathname === '/search') {
          router.replace(url);
        } else {
          router.push(url);
        }
      }}
    />
  );
}
