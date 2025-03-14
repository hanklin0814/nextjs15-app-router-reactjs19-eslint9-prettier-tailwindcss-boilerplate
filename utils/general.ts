function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const fetcher = async (url: string, options = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || error.message || 'Request failed');
  }
  return res.json();
};

// 重試函數
async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

export { classNames, fetcher, retry };
