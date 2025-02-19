'use client';
import Image from 'next/image';

import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';
import { useContextData } from '@/context/CommonContext';
import { useModal } from '@/context/ModalContext';

export default function Home() {
  const { openModal } = useModal();
  const { users } = useContextData();

  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-3xl font-bold">User List</h1>
        <p className="text-lg mb-4">server component 用 fetch 拉取資料</p>
        <button
          className="bg-green-500 p-2 hover:bg-green-800"
          onClick={openModal}
        >
          Open Modal
        </button>
        {users.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
