'use client';
import Image from 'next/image';

import Announcement from '@/components/Announcement';
import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { useContextData } from '@/context/CommonContext';
import { useModal } from '@/context/ModalContext';
import { useWebsiteConfig } from '@/context/WebsiteContext';

import Aside from './Aside';
import Footer from './Footer';
import Main from './Main';

export default function Desktop({ children }: { children?: React.ReactNode }) {
  const { webConfig } = useWebsiteConfig();

  return (
    <div className={`p-4 ${webConfig.desktop.theme}`}>
      <div className="fixed top-0 right-0 text-stone-100 bg-slate-500 opacity-90">
        isDesktop
      </div>
      <header className="border border-blue-500 mb-2 bg-lime-800">
        <Image
          className="dark:invert"
          src="/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </header>
      <nav className="border border-blue-500">
        <Navigation />
      </nav>
      <Slider />
      <Announcement />
      <div className="flex">
        <Aside />
        <Main />
      </div>
      <Footer />
    </div>
  );
}
