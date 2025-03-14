import { DEVICE, LAYOUT, THEME } from '@/constants';
import { db } from '@/drizzle/db';
import { config, settings } from '@/drizzle/schema';
import { retry } from '@/utils/general';

// 定義預設配置
const DEFAULT_WEB_CONFIG = {
  device: DEVICE.DESKTOP,
  theme: THEME.LIGHT,
  layoutType: LAYOUT.TYPE_A,
};

export const DEFAULT_CONFIG = {
  config: {
    desktop: { theme: 'dark', layout: 'A' },
    mobile: { theme: 'dark', layout: 'B' },
  },
};

export async function getWebConfig() {
  try {
    const result = await retry(async () => {
      const data = await db.select().from(settings).limit(1);
      if (!data || data.length === 0) {
        throw new Error('No config found in database');
      }
      return data;
    });

    return {
      device: result[0].device,
      theme: result[0].theme,
      layoutType: result[0].layoutType,
    };
  } catch (error) {
    console.error('Failed to fetch web config:', error);

    // 如果是開發環境，顯示更詳細的錯誤
    if (process.env.NODE_ENV === 'development') {
      console.error('Detailed error:', error);
    }

    // 回傳預設配置
    return DEFAULT_WEB_CONFIG;
  }
}

export async function getConfig() {
  try {
    const result = await retry(async () => {
      const data = await db.select().from(config).limit(1);
      if (!data || data.length === 0) {
        throw new Error('No config found in database');
      }
      return data;
    });

    return result[0];
  } catch (error) {
    console.error('Failed to fetch config:', error);

    // 如果是開發環境，顯示更詳細的錯誤
    if (process.env.NODE_ENV === 'development') {
      console.error('Detailed error:', error);
    }

    // 回傳預設配置
    return DEFAULT_CONFIG;
  }
}

// 健康檢查函數
export async function checkDatabaseConnection() {
  try {
    await db.select().from(settings).limit(1);
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}
