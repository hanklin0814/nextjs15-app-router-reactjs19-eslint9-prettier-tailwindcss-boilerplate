import { Todo } from '@/drizzle/schema';
import { httpWithAuth } from '@/lib/http/instance';
import type {
  AddToDoRequest,
  ApiDataResponse,
  ApiResponse,
  ToggleToDoRequest,
} from '@/types';

export const fetchTodos = async () => {
  return httpWithAuth.get<ApiDataResponse<Todo[]>>(`/api/todos`);
};

export const addTodo = async (data: AddToDoRequest) => {
  return httpWithAuth.post<ApiResponse>(`/api/todos`, data);
};

export const toggleTodo = async (data: ToggleToDoRequest) => {
  return httpWithAuth.put<ApiResponse>(`/api/todos`, data);
};

export const deleteTodo = async (params: { id: number }) => {
  return httpWithAuth.delete<ApiResponse>(`/api/todos`, params);
};
