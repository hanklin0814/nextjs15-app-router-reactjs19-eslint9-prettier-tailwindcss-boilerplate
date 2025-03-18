export interface AddToDoRequest {
  title: string;
}

export interface ToggleToDoRequest {
  id: number;
  completed: boolean;
}
