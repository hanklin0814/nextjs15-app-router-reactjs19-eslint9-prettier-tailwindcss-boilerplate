import { User } from '@/drizzle/schema';
import { httpAuth } from '@/lib/http/instance';
import type {
  ApiDataResponse,
  ApiResponse,
  LoginRequest,
  SignupRequest,
} from '@/types';

export const login = async (credentials: LoginRequest) => {
  return httpAuth.post<ApiDataResponse<User>>(`/api/login`, credentials);
};

export const logout = async () => {
  return httpAuth.get<ApiResponse>(`/api/logout`);
};

export const signup = async (credentials: SignupRequest) => {
  return httpAuth.post<ApiResponse>(`/api/signup`, credentials);
};
