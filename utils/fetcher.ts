const fetcher = async (url: string, options = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || error.message || 'Request failed');
  }
  return res.json();
};

export { fetcher };
