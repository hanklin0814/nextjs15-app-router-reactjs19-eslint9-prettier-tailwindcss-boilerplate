export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

// 定義介面
export interface JwtPayload {
  username: string;
  exp?: number;
  iat?: number;
}
