'use client';

import Announcement from '@/components/Announcement';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Slider from '@/components/Slider';
import { useWebsiteConfig } from '@/context/WebsiteContext';

import Aside from './Aside';
import Footer from './Footer';
import Main from './Main';

export default function Mobile({ children }: { children?: React.ReactNode }) {
  const { webConfig } = useWebsiteConfig();

  return (
    <div className={`p-4 pb-[70px] ${webConfig.mobile.theme}`}>
      <div className="fixed top-0 right-0 text-stone-100 bg-slate-500 opacity-90">
        isMobile
      </div>
      <LanguageSwitcher />
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
