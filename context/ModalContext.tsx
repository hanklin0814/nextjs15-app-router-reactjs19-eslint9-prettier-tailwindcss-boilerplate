'use client';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ModalContextType {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  open: true,
  openModal: () => null,
  closeModal: () => null,
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  // 如果沒有把它 memo 起來，一旦 CounterProvider re-render，其所有的
  // consumer 都會 re-render（即使 counter 沒有改變）
  const contextValueData: ModalContextType = useMemo(() => {
    return {
      open,
      openModal,
      closeModal,
    };
  }, [closeModal, open, openModal]);

  return (
    <ModalContext.Provider value={contextValueData}>
      {children}
    </ModalContext.Provider>
  );
}

// 自訂 hook：依據最佳實踐確保在 Provider 範圍內使用
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
