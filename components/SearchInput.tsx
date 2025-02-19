'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SearchInput({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trim();

    if (newQuery) {
      setQuery(newQuery);
      startTransition(() => {
        router.push(`/search?q=${newQuery}`);
      });
    } else {
      setQuery('');
      startTransition(() => {
        router.push(`/search`);
      });
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter search keyword..."
        className="p-2 border border-gray-300 rounded w-full text-black"
      />
      {isPending && <p>Updating...</p>}
    </div>
  );
}
