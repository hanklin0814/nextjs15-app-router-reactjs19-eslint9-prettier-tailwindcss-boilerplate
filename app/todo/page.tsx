'use client';
import { useState } from 'react';

import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';
import { useTodos } from '@/hooks/useTodos';

export default function TodoPage() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async () => {
    if (!newTodo) return;
    await addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
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
      {error && <p className="text-red-500">{error}</p>}
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
                onClick={() => toggleTodo(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
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
