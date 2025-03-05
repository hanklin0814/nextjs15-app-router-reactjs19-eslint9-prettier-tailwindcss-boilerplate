'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchInput({ placeholder }: { placeholder: string }) {
  // const [query, setQuery] = useState(initialQuery);
  const [isTransitioning, startTransition] = useTransition();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const handleChange = (term: string) => {
  //   const newQuery = e.target.value.trim();

  //   if (newQuery) {
  //     setQuery(newQuery);
  //     startTransition(() => {
  //       router.push(`/search?q=${newQuery}`);
  //     });
  //   } else {
  //     setQuery('');
  //     startTransition(() => {
  //       router.push(`/search`);
  //     });
  //   }
  // };

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="mb-4">
      <input
        type="text"
        // value={query}
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleChange(e.target.value.trim())}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded w-full text-black"
      />
      {isTransitioning && <p>Transitioning...</p>}
    </div>
  );
}
