'use client';
import { useTranslations } from 'next-intl';

import { LAYOUT } from '@/constants';
import { useWebsiteConfig } from '@/context/WebsiteContext';
import { classNames } from '@/utils/general';

export default function Slider() {
  const { webConfig } = useWebsiteConfig();
  const t = useTranslations();

  return (
    <div id="slider" className={`flex p-2 mt-2 mb-2 bg-blue-500 h-[300]}`}>
      {t('section.carousel')}
    </div>
  );
}
