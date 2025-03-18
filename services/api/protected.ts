import { User } from '@/drizzle/schema';
import { httpWithAuth } from '@/lib/http/instance';
import type { ApiDataResponse } from '@/types';

export const fetchProtectedData = async () => {
  return httpWithAuth.get<ApiDataResponse<User>>(`/api/protected`);
};
