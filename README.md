# Next.js 15 專案樣板
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## 專案特色
- Next.js 15 App Router
- React 19 
- TypeScript 5
- JWT + Cookie 驗證機制
- 統一錯誤處理
- Tailwind CSS
- ESLint 9 + Prettier
- PostgreSQL in Docker

## 專案架構與說明

### 1. HTTP 請求處理
位於 `lib/http/` 目錄，採用類別封裝方式處理 HTTP 請求：

```typescript
lib/http/
├── classes/
│   ├── Http.ts        // HTTP 請求類別
│   └── AppError.ts    // 統一錯誤處理類別
├── config.ts          // HTTP 配置
├── instance.ts        // Axios 實例
└── types.ts          // TypeScript 型別定義
```

### 2. 錯誤處理機制
採用統一的錯誤處理方式：

```typescript
utils/
├── errorHandler.ts    // 統一錯誤處理
├── general.ts    // 常見共用函式
└── showToast.ts      // 錯誤提示
```

### 3. 驗證機制
使用 JWT + Cookie 的方式處理驗證：

```typescript
app/
├── api/
│   ├── login/        // 登入 API
│   ├── logout/       // 登出 API
│   └── protected/    // 需驗證的 API
└── auth/
│   ├── signup/       // 註冊頁面
    └── login/        // 登入頁面
```

### 4. 型別定義
集中管理所有型別定義：

```typescript
types/
├── auth.d.ts         // 驗證相關型別
├── error.d.ts        // 錯誤處理相關型別
└── api.d.ts          // API 相關型別
```

## 主要功能說明

### 1. 錯誤處理
使用統一的 `AppError` 類別處理錯誤：

```typescript
// 使用方式
try {
  // 業務邏輯
} catch (error) {
  const errorResponse = handleError(error, {
    showToast: true,
    defaultMessage: '操作失敗'
  });
}
```

### 2. API 請求
提供三種請求實例：

```typescript
// 一般請求
http.get('/api/public');

// 需要驗證的請求
httpWithAuth.get('/api/protected');

// 登入相關請求
httpAuth.post('/api/login');
```

### 3. JWT + Cookie 驗證
- 使用 HTTP-Only Cookie 存放 JWT
- 自動處理未驗證的情況
- 支援 Token 過期自動重新整理

## 開發指南

### 環境設定
1. 建立 `.env` 檔案：
```env
DATABASE_URL=postgres://docker:docker@localhost:5432/pg_testdb
```

2. 建立 `.env.local` 檔案：
```env
NODE_ENV=development
JWT_SECRET=jwt_token_test
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=http://localhost:3000

```

3. 安裝套件
```bash
npm install
```

### 開發流程
1. 啟動開發伺服器：
```bash
npm run dev
```

2. 建立新的 API：
- 在 `app/api/` 下建立新的路由
- 在 `services/api/` 下加入對應的服務
- 在 `types/` 下定義相關型別

3. 錯誤處理：
- 使用 `AppError` 建立自定義錯誤
- 使用 `handleError` 統一處理錯誤
- 適時顯示錯誤提示

### 測試
```bash
npm run test
```

### 打包程式碼
```bash
npm run build
```

### 使用 eslint 檢查程式碼
```bash
npm run lint
```

### 使用 prettier 格式化程式碼
```bash
npm run format
```

## 注意事項
1. 所有 API 回應都應遵循統一格式
2. 錯誤處理應使用統一的錯誤處理機制
3. 驗證相關的請求應使用 `httpWithAuth`
4. 配置檔案應放在對應的目錄中

## 常見問題
Q: 如何處理 401 未驗證錯誤？
A: 系統會自動導向登入頁面

Q: 如何自定義錯誤處理？
A: 使用 `createErrorHandler` 建立客製化的錯誤處理器

## Troubleshooting
如果遇到奇怪的錯誤，可嘗試以下幾點做法：
- 刪除 /node_modules，再重新執行 `npm install`
- 刪除 .next 資料夾後再啟動 `npm run dev`


## 專案資料夾結構說明及範例

### Next.js 15 + React 19 + Drizzle + PostgreSQL in Docker Boilerplate
這是一個基於 Next.js (App Router 與 ISR 範例)、React 19、Tailwind CSS、ESLint 9、Drizzle ORM 與 PostgreSQL (運行於 Docker) 的專案啟動模板，搭配自定義 hooks 與清晰的資料夾結構，可作為現代前後端整合專案的起點。

#### 主要套件與技術說明

**React 19**
> 支援最新的 Concurrent 與 Transition 特性，讓使用者互動更流暢。

**Tailwind CSS**
> 以實用性為導向的 CSS 框架，幫助快速建立現代化 UI。

**Drizzle ORM**
> 輕量化的 TypeScript ORM，搭配 PostgreSQL 操作資料庫，提供直覺且類型安全的 API。

**PostgreSQL in Docker**
> 利用 Docker Compose 啟動 PostgreSQL 與 pgAdmin，確保本地開發環境一致性。

**ESLint 與 Prettier**
> 統一程式碼風格與質量檢查，維持團隊程式碼一致性。

**自定義 Hooks (useTodos)**
> 將 Todo 相關的 API 操作與狀態管理封裝成自訂 hook，使前端頁面更加精簡與易於維護。

**Docker Compose 使用說明**
> 在與 docker-compose.yml 同一目錄下，執行以下指令以啟動 PostgreSQL 與 pgAdmin 兩個服務：

NEXT
├── app/
│ ├── api/ // API 資料夾
│ │  └── todos/ // todos 功能資料夾
│ │     └── route.ts // REST API 路由，使用 Drizzle ORM 操作 PostgreSQL
│ ├── dashboard/ // Dashboard 區塊 (例如後台/專區)
│ │  └── settings/ // dashboard nested 區塊
│ │  │  └── page.tsx // settings 首頁 (URL: /dashboard/settings)
│ │  ├── layout.tsx // dashboard 區塊專用 (如側邊欄、子導航)
│ │  ├── loading.tsx // dashboard 區塊專用，資料載入中顯示
│ │  └── page.tsx // dashboard 首頁 (URL: /dashboard)
│ │
│ ├── search/ // Search 區塊
│ │  ├── error.tsx // 當 SearchPage 發生錯誤時，此錯誤邊界組件會顯示錯誤訊息與重試按鈕。注意此組件必須是 Client Component（使用 'use client';）
│ │  ├── loading.tsx // 當 SearchPage 內的資料還在載入時，會顯示此 Loading 頁面
│ │  └── page.tsx // SearchPage，為 Server Component，會根據 URL 中的查詢參數（例如 ?q=xxx）取得搜尋關鍵字，並透過 Suspense 包裹搜尋結果組件
│ │
│ ├── todo/ // Todo 區塊
│ │  ├── layout.tsx // todo 區塊專用
│ │  └── page.tsx // todo 首頁 (URL: /todo)
│ │
│ ├── auth/ // 驗證相關頁面
│ │  ├── login/
│ │  │  └── page.tsx // 登入頁面 (URL: /auth/login)
│ │  └── register/
│ │     └── page.tsx // 註冊頁面 (URL: /auth/register)
│ │
│ ├── error.tsx // 全站共用 error，錯誤時顯示
│ ├── layout.tsx // 全站共用 layout，在多個頁面之間定義共用 UI，其狀態將會被保存 (如 nav、header、footer 等元件)
│ ├── loading.tsx // 全站共用 loading，資料載入中顯示
│ ├── not-found.tsx // 全站共用 not-found，無對應頁面時顯示 404 not found
│ ├── page.tsx // 在資料夾底下需包含 page.tsx 檔案，才會被定義為一個 route segment，對應 "/" 路由
│ └── Providers.tsx // 全站共用 Providers，Providers 與其內部的 Context Provider 皆為 Client Component，能夠使用 useState、useContext 等客戶端 hook
│
├── components/ // 全局共享的 UI 組件 (不屬於路由層級)
│ ├── Slider.tsx
│ ├── Modal.tsx
│ ├── Navigation.tsx
│ ├── SearchInput.tsx // Client Component，使用 useTransition 處理 URL 更新（利用 router.push 進行輕量級過渡）
│ └── SearchResults.tsx // Server Component，用於抓取搜尋結果資料。利用內建 fetch 搭配 revalidate 與 Suspense 實現資料流式呈現
│
├── config/ // 全局配置 (主題、環境參數等)
│ ├── app.config.ts // 例如主題、預設導航項目等設定
│ └── env.config.ts // 環境變數與其他配置
│
├── constants/ // 常用常數定義
│ ├── api.ts
│ ├── constants.ts
│ ├── example.ts
│ ├── index.ts
│ ├── layout.ts
│ ├── routes.ts
│ └── theme.ts
│
├── context/ // React Context，用於全局狀態管理
│ ├── ModalContext.tsx
│ ├── UserContext.tsx
│ └── WebsiteContext.tsx
│
├── drizzle/ // Drizzle ORM 連線設定與資料庫 schema
│ ├── db.ts // Drizzle ORM 與 PostgreSQL 的連線
│ └── schema.ts // Drizzle ORM 資料庫 schema 定義
│
├── enums/ // 常用列舉定義
│ ├── enums.ts
│ ├── index.ts
│ ├── status.ts
│ └── toast.ts
│
├── hooks/ // 自定義 React hooks
│ ├── api/ // API 相關
│ │  ├── useRequest.ts // 通用請求 hook
│ │  ├── useLazyRequest.ts // 延遲請求 hook
│ │  └── index.ts
│ ├── useAuth.ts
│ ├── useDebounce.ts
│ ├── useDebounceFn.ts
│ └── useTodos.ts
│
├── lib/ // 與外部服務或後端邏輯相關的功能封裝
│ ├── http/ // HTTP 請求相關封裝
│ │  ├── classes/
│ │  │  ├── Http.ts // HTTP 請求類別
│ │  │  └── HttpError.ts // HTTP 錯誤處理類別
│ │  ├── config.ts // HTTP 設定 (BASE_URL, TIME_OUT 等)
│ │  ├── handler.ts // HTTP 請求處理器
│ │  ├── instance.ts // axios 實例配置
│ │  ├── types.ts // HTTP 相關型別定義
│ │  └── index.ts // HTTP 模組導出
│ │
│ ├── api.ts // API 請求封裝
│ ├── db.ts // 資料庫連線與操作
│ └── authClient.ts // 驗證相關客戶端邏輯
│
├── locales/ // 多國語系翻譯檔案
│ ├── en.json
│ └── zh.json
│
├── public/ // 靜態資源 (圖片、svg、favicon 等)
│ ├── fonts/
│ ├── icons/
│ ├── images/
│ └── favicon.ico
│
├── pgadmin/ // pgAdmin 設定檔
│ └── pgdb_servers.json //用途是給 pgAdmin docker 啟動時設置環境用
│
├── services/ // 業務邏輯服務層
│ ├── api/ // API 服務
│ │  ├── auth.ts // 驗證相關 API
│ │  ├── user.ts // 用戶相關 API
│ │  ├── department.ts // 部門相關 API
│ │  └── index.ts
│ └── index.ts
│
├── sql/ // Docker 初始化 SQL 腳本 (自動建立資料庫與表格)
│ └── initdb.sql //這用檔案的用途是給 postgres docker 啟動時透過 volumn 指令掛戴將此 SQL 檔案映射到 docker 內的 /docker-entrypoint-initdb.d/init.sql 檔，使得 docker initial 時會自動建立一個名為 pg_testdb 的資料庫
│
├── styles/ // 全局樣式 (CSS、SCSS 或 Tailwind CSS)
│ ├── globals.css
│ └── nprogress.css
│
├── tests/ // 測試檔案資料夾 (Jest 與 React Testing Library)
│ ├── app/ // 與 app 相關的測試
│ │ ├── page.test.tsx // 根頁面的測試
│ │ └── dashboard/ // dashboard 區塊測試
│ │ ├── page.test.tsx // dashboard 首頁測試
│ │ └── StatsCard.test.tsx // dashboard 專用組件測試
│ ├── components/ // 全局共享組件的測試
│ │ ├── Navigation.test.tsx
│ │ └── Modal.test.tsx
│ ├── hooks/ // 自定義 hooks 測試
│ │ └── useDebounce.test.ts // 例如 useDebounce 的測試
│ └── utils/ // 工具函數的測試
│ └── formatDate.test.ts
│
├── types/ // 全局 TypeScript 型別定義
│ ├── user.d.ts
│ └── product.d.ts
│
├── utils/ // 工具函數與輔助程式
│ ├── general.ts //常用共用的輔助程式
│ └── showToast.ts //共用的通知
│
├── .env // 環境變數設定檔
├── docker-compose.yml // Docker Compose 設定檔 (啟動 PostgreSQL 與 pgAdmin)
├── package.json
├── tsconfig.json
├── next.config.js
├── jest.config.js // Jest 測試工具配置檔
└── README.md // 專案說明文件

### 說明與補充

#### app/

layout.tsx 與 page.tsx：作為根路由的入口，設定全局佈局與首頁內容。

dashboard/ 區塊內新增了 loading、error 頁面，便於針對資料載入、錯誤提供專屬處理與顯示。
auth/ 區塊放置驗證（登入/註冊）相關頁面。
子資料夾 components/ 放置與該區塊相關的專用組件。
components/（根級別）
放置不隸屬於某個特定路由的全局組件，如 Header 與 Modal，可在整個專案中重複使用。

#### config/

存放全局設定，例如應用配置與環境參數，方便在各個模組中引用統一配置。

#### context/ 與 hooks/
用於全局狀態管理與自定義 hooks，解耦各頁面間的狀態傳遞與邏輯。

#### lib/ 與 services/

lib/ 封裝與外部系統（API、資料庫）相關的操作。
services/ 負責業務邏輯，例如用戶與產品操作，這層邏輯可以在不同頁面與組件中共用。

#### types/、utils/、enums/ 與 locales/

分別負責全局型別定義、輔助工具、常量與翻譯檔案，讓各模組間數據格式統一、易於維護。

#### public/ 與 styles/

分別管理靜態資源與全局樣式，確保資源能夠正確加載並與頁面風格保持一致。

#### tests/

建議統一將測試檔案放在 tests/ 資料夾中，依照功能模組分子資料夾，例如測試 app 層級、全局組件、自定義 hooks 與工具函數。
Jest 配置文件 (jest.config.js) 則放在專案根目錄，用於設置測試環境與相關轉譯設定。
測試檔案命名可使用 .test.tsx 或 .spec.tsx 來標識，方便工具自動識別。
其他檔案

#### .env 存放環境變數。

README.md 用於記錄專案簡介、開發流程、部署步驟與常見問題解答。
這樣一來，不論是開發新頁面、擴充功能，還是撰寫單元與整合測試，都能夠有條不紊地進行。這套結構既符合 Next.js App Router 的最新規範，也方便團隊協作與後續維護，您可以根據實際情況進行微調。

### Next.js 使用基於檔案系統的路由（file-system based router）

Next.js 提供兩種管理頁面路由的方式，分別是舊版本適用的 Pages Router 以及 v13 後推出的 App Router，兩者差異在於：

- Pages Router
  - 定義頁面層級的路由
  - 所有元件為 React Client Component（客戶端元件）
  - 只能使用 Next.js 提供的預設規則，如：檔案名稱即為路徑
- App Router
  - 定義應用程式層級的路由
  - 所有元件預設為 React Server Component（伺服器端元件）
  - 可自定義路由規則，如：使用正則表達式匹配特定路徑

如上所言，在 App Router 中所有元件預設為 React Server Component（RSC），意思是由伺服器將 React Component 準備好，再傳給 Client 顯示在畫面上。

而 RSC 的優缺點如下：

- 優點
  - 整合後端操作，如存取資料庫（DB）、讀取檔案（File System）
  - 降低資料間的依賴關係，改善請求瀑布流（Waterfall）導致的效能問題
  - 降低 JS Bundle Size 以提升頁面效能
- 缺點
  - 無法使用 React Hooks
  - 無法使用瀏覽器 API
  - 無法操作 DOM 事件監聽

面對上述缺點，Next.js 可依照使用情境不同，將元件定義為 Server Component 或 Client Component。舉例來說，當某個元件需要使用 Hooks 管理時，可透過在程式碼開頭加上 'use client' 來標示元件類型，該元件底下的子元件也會自動視為 Client Component。

---

### 使用 App router 及 useContext Best Practice
Context.tsx -> layout.tsx -> page.tsx

- ##### Context.tsx
  client component，定義 **context**、**Provider** 與 **custom hook** 將使用的 context 的邏輯封裝成自訂 hook，以避免在組件中重複檢查 Provider 範圍。

- ##### layout.tsx
  server component，使用 fetch 進行資料抓取，並利用`next: { revalidate: 60 }`的選項設定資料每 60 秒重新驗証一次。也可以根據需求設定`cache`選項，如`'force-cache'`或`'no-store'`。

- ##### page.tsx
  client component，能夠使用`useContext`等 hook，將取得的資料進行加工或渲染畫面。

---

### 增加 SearchPage 範例
展示 Next.js 15 與 React 19 新功能的組合應用，利用文件式路由、嵌套路由、Suspense、ISR 以及 React 的 Concurrent 功能（`useTransition`）來構建一個現代化、靈活且高效的單頁應用。

- ##### 後端資料抓取與 ISR：
在 Server Component（如 SearchResults）中使用內建 fetch 搭配 next: { revalidate: 10 }，實現資料快取與自動更新。

- ##### 文件式與嵌套路由：
根 layout（app/layout.tsx）提供全局結構與主題，子路由（app/search/）則擁有專屬的 loading 與 error 處理，達到更細粒度的用戶體驗控制。

- ##### 客戶端交互與過渡：
SearchInput 利用 useTransition 實現輕量級 URL 更新，讓使用者在輸入搜尋關鍵字時能順暢切換頁面並刷新搜尋結果。

- ##### API-first 架構：
雖然此範例使用 JSONPlaceholder 作為假資料來源，但可擴充為與真正的 REST API 整合，前後端分離，易於擴展與維護。

---

### Docker Compose 使用說明
在與 docker-compose.yml 同一目錄下，執行以下指令以啟動 PostgreSQL 與 pgAdmin 兩個服務：
`docker compose up -d`
啟動成功後，可在另一個終端機視窗中執行以下指令檢查容器啟動狀況：
`docker ps`
這樣即可確認 pg_server (PostgreSQL) 與 pg_admin (pgAdmin) 已成功運行。
進一步，透過瀏覽器存取 http://localhost:5431 可使用 pgAdmin 進行資料庫管理。