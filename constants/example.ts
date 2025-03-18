import { EnumValues } from './';

// 使用 enum 應用情場
// - 適合大型專案中需要明確列舉概念、需要反向映射或需要自動生成列舉對象的情況。
// - 常用於後端或那些對運行時開銷不太敏感的專案。
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

// 使用 Object as const 應用情場
// - 當需要一個輕量級的、不產生額外運行時物件的列舉，並且需要在型別層面保證精確字面量時。
// - 適合前端應用中用於配置、路由定義或常量管理等。
const STATUS2 = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
} as const;

type STATUS_TYPE = EnumValues<typeof STATUS2>;
