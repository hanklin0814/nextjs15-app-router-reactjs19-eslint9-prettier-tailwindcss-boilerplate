'use client';

import {
  SlBell,
  SlDiamond,
  SlEarphonesAlt,
  SlPicture,
  SlSupport,
} from 'react-icons/sl';

import { useWebsiteConfig } from '@/context/WebsiteContext';
import { classNames } from '@/utils/general';

const footerItem = [
  {
    label: '優惠',
    icon: <SlPicture />,
    isMain: false,
  },
  {
    label: '客服',
    icon: <SlSupport />,
    isMain: false,
  },
  {
    label: '',
    icon: <SlBell />,
    isMain: true,
  },
  {
    label: '存取款',
    icon: <SlDiamond />,
    isMain: false,
  },
  {
    label: '我的',
    icon: <SlEarphonesAlt />,
    isMain: false,
  },
];

export default function Footer() {
  const { webConfig } = useWebsiteConfig();

  return (
    <footer
      id="footer"
      className="border border-blue-500 fixed bottom-0 left-0 w-full rounded-t-2xl overflow-hidden"
    >
      <ul className="p-3 flex justify-around items-center">
        {footerItem.map((item, index) => (
          <li key={index} className="relative">
            <div
              className={classNames(
                item.isMain
                  ? 'bg-gray-500 rounded-full p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : '',
                'flex justify-center'
              )}
            >
              {item.icon}
            </div>
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </footer>
  );
}
