'use client';
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
}

export default function Providers({
  webConfig,
  users,
  todo,
  children,
}: ProvidersProps) {
  return (
    <WebsiteProvider webConfig={webConfig}>
      <ToastContainer />
      <ModalProvider>
        <Modal />
        <CommonProvider users={users} todo={todo}>
          {children}
        </CommonProvider>
      </ModalProvider>
    </WebsiteProvider>
  );
}
