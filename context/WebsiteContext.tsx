'use client';
import { createContext, useContext } from 'react';

import { LAYOUT_TYPE, THEME_TYPE } from '@/constants';

export interface WebConfig {
  theme: THEME_TYPE;
  layoutType: LAYOUT_TYPE;
}

interface WebsiteContextType {
  webConfig: WebConfig;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

interface WebsiteProviderProps {
  webConfig: WebConfig;
  children: React.ReactNode;
}

export function WebsiteProvider({ webConfig, children }: WebsiteProviderProps) {
  return (
    <WebsiteContext.Provider value={{ webConfig }}>
      {children}
    </WebsiteContext.Provider>
  );
}

// 自訂 hook：依據最佳實踐確保在 Provider 範圍內使用
export function useWebsiteConfig() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsiteConfig must be used within a WebsiteProvider');
  }
  return context;
}
