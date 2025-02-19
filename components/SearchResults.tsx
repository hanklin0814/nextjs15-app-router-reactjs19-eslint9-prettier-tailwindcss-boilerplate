interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export default async function SearchResults({ query }: { query: string }) {
  // 根據 query 呼叫 API 取得搜尋結果，若 query 為空則返回空陣列
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?q=${query}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch search results');
  const results = await res.json();

  return (
    <ul className="mt-4">
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        results.map((post: Post) => (
          <li key={post.id} className="p-2 border-b">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))
      )}
    </ul>
  );
}
