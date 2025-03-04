'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants';
import { classNames } from '@/utils/general';

const navItem = [
  {
    label: 'Home',
    href: ROUTES.HOME,
  },
  {
    label: 'Blog',
    href: ROUTES.BLOG,
  },
  {
    label: 'Search',
    href: ROUTES.SEARCH,
  },
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
  },
  {
    label: 'Todo',
    href: ROUTES.TODO,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex space-x-4">
      {navItem.map((item, index) => (
        <Link
          key={index}
          className={classNames(
            item.href === pathname
              ? 'bg-blue-900 text-white'
              : 'hover:text-blue-500',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
