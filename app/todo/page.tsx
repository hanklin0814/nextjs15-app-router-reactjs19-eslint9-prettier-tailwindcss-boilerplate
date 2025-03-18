'use client';
import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { Todo } from '@/drizzle/schema';
import { addTodo, deleteTodo, fetchTodos, toggleTodo } from '@/services/api';
import { ToggleToDoRequest } from '@/types';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchTodos();
      setLoading(false);

      if (response.success && response.data) {
        setTodos(response.data);
      }
    };
    fetchData();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo) return;
    setLoading(true);
    const response = await addTodo({ title: newTodo });
    setLoading(false);

    if (response.success) {
      const response = await fetchTodos();

      if (response.success && response.data) {
        setTodos(response.data);
        setNewTodo('');
      }
    }
  };

  const handleToggleTodo = async (data: ToggleToDoRequest) => {
    setLoading(true);
    const response = await toggleTodo(data);
    setLoading(false);

    if (response.success) {
      const response = await fetchTodos();

      if (response.success && response.data) {
        setTodos(response.data);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setLoading(true);
    const response = await deleteTodo({ id });
    setLoading(false);

    if (response.success) {
      const response = await fetchTodos();

      if (response.success && response.data) {
        setTodos(response.data);
      }
    }
  };

  return (
    <div className="p-4">
      <Navigation />
      <Slider />
      <h2 className="text-2xl font-bold mb-4">TODO App</h2>
      <div className="flex mt-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 border p-2 rounded-l text-black"
          placeholder="New todo..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <ul className="mt-4">
        {Array.isArray(todos) &&
          todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b hover:bg-gray-600"
            >
              <span
                className={`flex-1 cursor-pointer ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
                onClick={() =>
                  handleToggleTodo({ id: todo.id, completed: !todo.completed })
                }
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
