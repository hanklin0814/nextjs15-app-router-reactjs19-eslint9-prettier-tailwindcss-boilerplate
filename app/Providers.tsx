'use client';
import { AbstractIntlMessages, IntlProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import Modal from '@/components/Modal';
import { CommonProvider, Todo, User } from '@/context/CommonContext';
import { ModalProvider } from '@/context/ModalContext';
import { WebConfig, WebsiteProvider } from '@/context/WebsiteContext';

interface ProvidersProps {
  children: React.ReactNode;
  webConfig: WebConfig;
  users: User[];
  todo: Todo[];
  locale: string;
  messages?: AbstractIntlMessages;
}

export default function Providers({
  webConfig,
  users,
  todo,
  children,
  locale,
  messages,
}: ProvidersProps) {
  return (
    // timeZone 設定的用意：整個應用在 SSR 與 CSR 的環境下都會使用統一的時區設定，從而避免因時區不一致引起的 markup 不匹配問題。
    <IntlProvider locale={locale} messages={messages} timeZone="Asia/Taipei">
      <WebsiteProvider webConfig={webConfig}>
        <ToastContainer />
        <ModalProvider>
          <Modal />
          <CommonProvider users={users} todo={todo}>
            {children}
          </CommonProvider>
        </ModalProvider>
      </WebsiteProvider>
    </IntlProvider>
  );
}
