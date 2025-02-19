'use client';
import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';
import { useContextData } from '@/context/CommonContext';

export default function TodoPage() {
  const { todo } = useContextData();

  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
      <h1 className="text-2xl font-bold mb-4">Todo</h1>
      <p className="text-lg mb-4">server component 用 fetch 拉取資料</p>

      <div className="space-y-4">
        {todo.map((todo) => (
          <div
            key={todo.id}
            className="p-4 border rounded shadow-sm bg-cyan-950"
          >
            <h2 className="text-xl font-semibold text-gray-400">
              {todo.title}
            </h2>
            <p>
              status:{' '}
              <span
                className={todo.completed ? 'text-green-500' : 'text-red-500'}
              >
                {todo.completed ? 'Completed' : 'Uncompleted'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
