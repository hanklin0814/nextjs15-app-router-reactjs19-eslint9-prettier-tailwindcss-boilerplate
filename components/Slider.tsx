'use client';

import { LAYOUT } from '@/constants';
import { useWebsiteConfig } from '@/context/WebsiteContext';
import { classNames } from '@/utils/general';

export default function Slider() {
  const { webConfig } = useWebsiteConfig();

  return (
    <div id="slider" className={`flex p-2 mt-2 mb-2 bg-blue-500 h-[300]}`}>
      輪播圖區塊
    </div>
  );
}
