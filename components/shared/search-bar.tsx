import { SearchIcon } from 'lucide-react';
import { CustomInput } from '../ui/custom/custom-input';
import { useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const DEFAULT_DELAY = 500;

interface ISearchBarProps {
  onSearch?: (value: string) => void;
  delay?: number;
  className?: string;
}

export function SearchBar({ onSearch, delay = DEFAULT_DELAY, className }: ISearchBarProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const q = useMemo(() => params.get('q') || '', [params]);

  const handleQueryParams = useCallback((value?: string) => {
    const queryParams = new URLSearchParams(params);
    if (value) {
      queryParams.set('q', value);
    } else {
      queryParams.delete('q');
    }
    router.push(`${pathname}?${queryParams.toString()}`);
  }, [params, pathname, router])

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        handleQueryParams(value);
        onSearch?.(value);
      }, delay),
    [onSearch, delay, handleQueryParams]
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }, [debouncedSearch])

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    }
  }, [debouncedSearch])

  return (
    <div className={cn("flex items-center gap-2 w-full max-w-xs relative", className)}>
      <SearchIcon className="w-4 h-4 text-muted-foreground absolute left-2" />
      <CustomInput 
        type="text" 
        placeholder="Search"
        defaultValue={q}
        className="pl-8 focus:rounded-2xl transition-all duration-300"
        onChange={handleSearch} 
      />
    </div>
  )
}