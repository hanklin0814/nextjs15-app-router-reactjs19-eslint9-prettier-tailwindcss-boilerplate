'use client';
import Announcement from '@/components/Announcement';
import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { useWebsiteConfig } from '@/context/WebsiteContext';

import Header from '../Header';
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
      <Header />
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
