'use client';

import { MessageKeys, useTranslations } from 'next-intl';
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
    key: 'promotions',
    label: '優惠',
    icon: <SlPicture />,
    isMain: false,
  },
  {
    key: 'customerService',
    label: '客服',
    icon: <SlSupport />,
    isMain: false,
  },
  {
    key: 'notification',
    label: '',
    icon: <SlBell />,
    isMain: true,
  },
  {
    key: 'depositsAndWithdrawals',
    label: '存取款',
    icon: <SlDiamond />,
    isMain: false,
  },
  {
    key: 'myAccount',
    label: '我的',
    icon: <SlEarphonesAlt />,
    isMain: false,
  },
];

export default function Footer() {
  const { webConfig } = useWebsiteConfig();
  const t = useTranslations('footer');

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
            <div className="text-xs">
              {t(
                item.key as MessageKeys<
                  IntlMessages,
                  keyof IntlMessages['footer']
                >
              )}
            </div>
          </li>
        ))}
      </ul>
    </footer>
  );
}
