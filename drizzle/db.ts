import { drizzle } from 'drizzle-orm/node-postgres'; // 若在 Node.js 環境下使用
import { Pool } from 'pg';

// 建立 pg 連線池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 使用 drizzle-orm 建立 db 連線
export const db = drizzle(pool, {
  // 其他選項（如果需要）
});
