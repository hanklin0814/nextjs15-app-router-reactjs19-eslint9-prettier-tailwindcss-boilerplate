import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    // 擴展 Next.js 與 Prettier 相關的規則
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],

    // 插件設定：這裡加入 simple-import-sort 插件
    plugins: ['simple-import-sort'],

    // 自定義規則
    rules: {
      // 關閉內建 no-unused-vars 規則，改用 @typescript-eslint 的檢查
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // 關閉 Next.js 內建圖片檢查
      '@next/next/no-img-element': 'off',

      // 啟用 simple-import-sort 插件規則，保持 import 與 export 排序
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
    // parserOptions 設定：指定 ES 模組與最新語法
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  }),
];

export default eslintConfig;
