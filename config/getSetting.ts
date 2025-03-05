import { db } from '@/drizzle/db';
import { config, settings } from '@/drizzle/schema';

export async function getWebConfig() {
  // 直接讀取資料庫或其他來源
  const result = await db.select().from(settings).limit(1);

  if (!result || result.length === 0) {
    throw new Error('No config found');
  }

  const config = result[0];

  return {
    device: config.device,
    theme: config.theme,
    layoutType: config.layoutType,
  };
}

export async function getConfig() {
  // 直接讀取資料庫或其他來源
  const result = await db.select().from(config).limit(1);

  if (!result || result.length === 0) {
    throw new Error('No config found');
  }

  const configResult = result[0];

  return configResult;
}
