import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

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

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// 提取型別定義
export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;

export type Setting = InferSelectModel<typeof settings>;
export type NewSetting = InferInsertModel<typeof settings>;

export type Config = InferSelectModel<typeof config>;
export type NewConfig = InferInsertModel<typeof config>;

export type User = Omit<InferSelectModel<typeof users>, 'password'>;
export type UserWithPassword = InferSelectModel<typeof users>;
export type NewUser = Omit<
  InferInsertModel<typeof users>,
  'created_at' | 'updated_at'
>;
