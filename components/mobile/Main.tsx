'use client';
import { useTranslations } from 'next-intl';

import { useContextData } from '@/context/CommonContext';
import { useWebsiteConfig } from '@/context/WebsiteContext';

export default function Main() {
  const { users } = useContextData();
  const { webConfig } = useWebsiteConfig();
  const t = useTranslations();

  return (
    <main className="border border-blue-500 flex flex-col gap-2 flex-[1_1_auto] p-2">
      <h1 className="text-xl font-bold">{t('section.userList')}</h1>
      <ul>
        {users.map((user, index) => (
          <li
            key={index}
            className="inline-flex flex-col m-2 p-2 border rounded shadow w-[100px] h-[100px]"
          >
            <h5 className="text-md font-semibold">
              {user.name.substring(6, 0)}
            </h5>
            <p className="w-[80px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {user.email}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
// line-clamp-1
