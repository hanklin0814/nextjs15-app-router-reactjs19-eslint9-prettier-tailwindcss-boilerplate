import { boolean, json, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { DEVICE, LAYOUT, THEME } from '@/constants';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
});

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  device: text('device').notNull().default(DEVICE.DESKTOP),
  theme: text('theme').notNull().default(THEME.LIGHT),
  layoutType: text('layout_type').notNull().default(LAYOUT.TYPE_A), // 資料庫欄位命名建議用 snake_case
});

export const config = pgTable('config', {
  id: serial('id').primaryKey(),
  config: json('config')
    .notNull()
    .default(
      JSON.stringify({
        desktop: { theme: 'dark', layout: 'A' },
        mobile: { theme: 'light', layout: 'B' },
      })
    ),
});
