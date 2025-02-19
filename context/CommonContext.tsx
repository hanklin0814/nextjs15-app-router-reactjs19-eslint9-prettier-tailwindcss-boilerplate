'use client';
import { createContext, useContext } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

interface ContextType {
  users: User[];
  todo: Todo[];
}

const CommonContext = createContext<ContextType | undefined>(undefined);

interface CommonProviderProps {
  users: User[];
  todo: Todo[];
  children: React.ReactNode;
}

export function CommonProvider({ users, todo, children }: CommonProviderProps) {
  return (
    <CommonContext.Provider value={{ users, todo }}>
      {children}
    </CommonContext.Provider>
  );
}

// 自訂 hook：依據最佳實踐確保在 Provider 範圍內使用
export function useContextData() {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useContextData must be used within a CommonProvider');
  }
  return context;
}
