export interface User {
  uuid: string
  id: number
  name: string
}

export interface Like {
  uuid: string
  user_id: number
  like: string
}

export type JoinType = 'inner' | 'left' | 'right' | 'outer'
