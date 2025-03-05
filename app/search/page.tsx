import { Suspense } from 'react';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import SearchInput from '@/components/SearchInput';
import SearchResults from '@/components/SearchResults';
import Slider from '@/components/Slider';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';

  return (
    <div className="p-4">
      <Header />
      <Navigation />
      <Slider />
      <h2 className="text-2xl font-bold mb-4">Search Page</h2>

      <SearchInput placeholder="Enter search keyword..." />

      {/* 使用 Suspense 顯示搜尋結果 */}
      <Suspense
        fallback={<p>Suspending... 取決於 dynamic component fetch data 時間</p>}
      >
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
