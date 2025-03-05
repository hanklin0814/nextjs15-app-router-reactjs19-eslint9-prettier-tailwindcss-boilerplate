'use client';
import { MessageKeys, useTranslations } from 'next-intl';
import {
  SlBriefcase,
  SlGameController,
  SlGhost,
  SlMouse,
  SlPlane,
  SlRocket,
  SlSocialReddit,
  SlSpeedometer,
  SlStar,
} from 'react-icons/sl';

import { useWebsiteConfig } from '@/context/WebsiteContext';

const asideItem = [
  {
    key: 'popular',
    label: '熱門',
    icon: <SlGhost />,
  },
  {
    key: 'electronic',
    label: '電子',
    icon: <SlPlane />,
  },
  {
    key: 'live',
    label: '真人',
    icon: <SlRocket />,
  },
  {
    key: 'sports',
    label: '體育',
    icon: <SlBriefcase />,
  },
  {
    key: 'eSports',
    label: '電競',
    icon: <SlGameController />,
  },
  {
    key: 'cardGames',
    label: '棋牌',
    icon: <SlMouse />,
  },
  {
    key: 'fishing',
    label: '捕魚',
    icon: <SlSocialReddit />,
  },
  {
    key: 'lottery',
    label: '彩票',
    icon: <SlSpeedometer />,
  },
  {
    key: 'arcade',
    label: '街機',
    icon: <SlStar />,
  },
];

export default function Aside() {
  const { webConfig } = useWebsiteConfig();
  const t = useTranslations('aside');

  return (
    <aside id="aside" className={`border border-blue-500 flex-[0_0_220]`}>
      <ul className="flex flex-col gap-4 p-2">
        {asideItem.map((item, index) => (
          <li
            key={index}
            className="flex w-full bg-slate-400 hover:bg-slate-600 cursor-pointer text-white p-3 items-center rounded-lg"
          >
            <span className="mr-2">{item.icon}</span>
            <span>
              {t(
                item.key as MessageKeys<
                  IntlMessages,
                  keyof IntlMessages['aside']
                >
              )}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
