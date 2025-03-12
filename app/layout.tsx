import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

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

  // 從 cookies 中取得使用者語系，若無則預設 'en'
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  // const timeZone = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  // console.log(cookieStore.get('NEXT_LOCALE'));
  // console.log('server component', { config, locale });

  // 根據 locale 動態載入對應的翻譯檔
  const messages = (await import(`../locales/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <title>Next.js App</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
          webConfig={config as WebConfig}
          users={users}
          todo={todo}
          locale={locale}
          messages={messages}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
