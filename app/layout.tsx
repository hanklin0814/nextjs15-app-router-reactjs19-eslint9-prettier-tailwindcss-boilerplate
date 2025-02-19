import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { API } from '@/constants';
import { LAYOUT, THEME } from '@/constants';

import Providers from './Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description: 'Next Boilerplate Template For Scaffolding Project',
};

async function getUserList() {
  const response = await fetch(API.USERS, {
    next: { revalidate: 60 },
    cache: 'force-cache',
  });

  if (!response.ok) throw Error;
  return await response.json();
}

async function getTodo() {
  const response = await fetch(API.TODOS, {
    next: { revalidate: 60 },
    cache: 'force-cache',
  });

  if (!response.ok) throw Error;
  return await response.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUserList();
  const todo = await getTodo();

  // 假設這個值是從外部取得，例如讀取配置或 API
  const webConfig = {
    theme: THEME.DARK,
    layoutType: LAYOUT.TYPE_A, // 後台設置後，由 fetch API 取得後注入點
  };

  return (
    <html lang="en">
      <head>
        <title>Next.js App</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${webConfig.theme}`}
      >
        <Providers webConfig={webConfig} users={users} todo={todo}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
