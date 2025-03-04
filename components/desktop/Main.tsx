'use client';
import { useContextData } from '@/context/CommonContext';
import { useModal } from '@/context/ModalContext';
import { useWebsiteConfig } from '@/context/WebsiteContext';

export default function Main() {
  const { openModal } = useModal();
  const { users } = useContextData();
  const { webConfig } = useWebsiteConfig();

  return (
    <main className="border border-blue-500 flex flex-col gap-4 flex-[1_1_auto] p-4">
      <h1 className="text-xl font-bold">User List</h1>
      <button
        className="bg-green-500 p-2 hover:bg-green-800 w-32"
        onClick={openModal}
      >
        Open Modal
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
