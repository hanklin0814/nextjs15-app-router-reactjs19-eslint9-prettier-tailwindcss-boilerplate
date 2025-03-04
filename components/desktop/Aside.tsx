'use client';
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
    label: '熱門',
    icon: <SlGhost />,
  },
  {
    label: '電子',
    icon: <SlPlane />,
  },
  {
    label: '真人',
    icon: <SlRocket />,
  },
  {
    label: '體育',
    icon: <SlBriefcase />,
  },
  {
    label: '電競',
    icon: <SlGameController />,
  },
  {
    label: '棋牌',
    icon: <SlMouse />,
  },
  {
    label: '捕魚',
    icon: <SlSocialReddit />,
  },
  {
    label: '彩票',
    icon: <SlSpeedometer />,
  },
  {
    label: '街機',
    icon: <SlStar />,
  },
];

export default function Aside() {
  const { webConfig } = useWebsiteConfig();

  return (
    <aside id="aside" className={`border border-blue-500 flex-[0_0_220]`}>
      <ul className="flex flex-col gap-4 p-2">
        {asideItem.map((item, index) => (
          <li
            key={index}
            className="flex w-full bg-slate-400 hover:bg-slate-600 text-white p-3 items-center rounded-lg"
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
