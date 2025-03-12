CREATE DATABASE pg_testdb;


-- 如果還是有問題，可以手動在 DBeaver 或 psql 建立 todos 表格：
-- CREATE TABLE todos (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   completed BOOLEAN DEFAULT FALSE NOT NULL
-- );

-- 如果還是有問題，可以手動在 DBeaver 或 psql 建立 settings 表格：
-- CREATE TABLE settings (
--   id SERIAL PRIMARY KEY,
--   device TEXT NOT NULL DEFAULT 'desktop',
--   theme TEXT NOT NULL DEFAULT 'light-theme',
--   layout_type TEXT NOT NULL DEFAULT 'A'
-- );

-- 如果還是有問題，可以手動在 DBeaver 或 psql 建立 users 表格：
-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(100) NOT NULL UNIQUE,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );