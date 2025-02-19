import { Suspense } from 'react';

import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';
import SearchInput from '@/components/SearchInput';
import SearchResults from '@/components/SearchResults';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const params = await searchParams;
  const query = params.q ?? '';

  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
      <h2 className="text-2xl font-bold mb-4">Search Page</h2>

      {/* 搜尋輸入框為 Client Component，可即時更新 URL */}
      <SearchInput initialQuery={query} />

      {/* 使用 Suspense 顯示搜尋結果 */}
      <Suspense fallback={<p>Loading results...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
