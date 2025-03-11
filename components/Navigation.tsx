'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageKeys, useTranslations } from 'next-intl';

import { ROUTES } from '@/constants';

const navItem = [
  {
    key: 'home',
    label: 'Home',
    href: ROUTES.HOME,
  },
  {
    key: 'blog',
    label: 'Blog',
    href: ROUTES.BLOG,
  },
  {
    key: 'search',
    label: 'Search',
    href: ROUTES.SEARCH,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
  },
  {
    key: 'todo',
    label: 'Todo',
    href: ROUTES.TODO,
  },
  {
    key: 'protected',
    label: 'Protected',
    href: ROUTES.PROTECTED,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <div className="flex space-x-4">
      {navItem.map((item, index) => (
        <Link
          key={index}
          className={clsx(
            item.href === pathname
              ? 'bg-blue-900 text-white'
              : 'hover:text-blue-500',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          href={item.href}
        >
          {t(
            item.key as MessageKeys<
              IntlMessages,
              keyof IntlMessages['navigation']
            >
          )}
        </Link>
      ))}
    </div>
  );
}
