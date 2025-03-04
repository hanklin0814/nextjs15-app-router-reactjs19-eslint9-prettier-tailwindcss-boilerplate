import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { getConfig } from '@/config/getSetting';
import { API } from '@/constants';
import { Todo, User } from '@/context/CommonContext';
import { WebConfig } from '@/context/WebsiteContext';

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

async function getUserList(): Promise<User[]> {
  const response = await fetch(API.USERS, {
    next: { revalidate: 60 },
    cache: 'force-cache',
  });

  if (!response.ok) throw Error;
  return await response.json();
}

async function getTodo(): Promise<Todo[]> {
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
  const { config } = await getConfig(); // 直連 DB 取得

  console.log('server component', { config });

  return (
    <html lang="en">
      <head>
        <title>Next.js App</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers webConfig={config as WebConfig} users={users} todo={todo}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
