export interface User {
  id: number;
  name: string;
}

export interface Like {
  user_id: number;
  like: string;
}


export type JoinType = 'inner' | 'left' | 'right' | 'outer';
