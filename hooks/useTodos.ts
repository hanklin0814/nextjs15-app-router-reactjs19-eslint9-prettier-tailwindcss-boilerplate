import { useEffect, useState } from 'react';

import { NEXT_API } from '@/constants';
import { fetcher } from '@/utils/fetcher';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

/*
1. 抽離自訂 hook：將 Todo API 操作封裝到 useTodos 中，讓頁面組件專注於呈現。
2. 統一錯誤處理：在自訂 hook 與 fetcher 中處理錯誤，並用 error 命名以避免 ESLint 警告。
3. 精簡頁面：頁面組件僅用來呈現狀態，使用自訂 hook 提供的資料與方法。
*/

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await fetcher(NEXT_API.TODOS);
      setTodos(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo and update state
  const addTodo = async (title: string) => {
    try {
      const newTodo = await fetcher(NEXT_API.TODOS, {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: { 'Content-Type': 'application/json' },
      });
      setTodos((prev) => [...prev, newTodo]);
    } catch (error: any) {
      setError(error.message || 'Failed to add todo');
    }
  };

  // Toggle completed state and update state
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      await fetcher(NEXT_API.TODOS, {
        method: 'PUT',
        body: JSON.stringify({ id, completed: !completed }),
        headers: { 'Content-Type': 'application/json' },
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error: any) {
      setError(error.message || 'Failed to update todo');
    }
  };

  // Delete a todo and update state
  const deleteTodo = async (id: number) => {
    try {
      await fetcher(NEXT_API.TODOS, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error: any) {
      setError(error.message || 'Failed to delete todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo, fetchTodos };
}
