import Image from 'next/image';

import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  return (
    <header className="relative border border-blue-500 mb-2 bg-lime-800">
      <Image
        className="dark:invert h-auto"
        src="/icons/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <LanguageSwitcher />
    </header>
  );
}
