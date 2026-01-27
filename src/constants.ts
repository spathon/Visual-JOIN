import type { JoinType, Like, User } from './types'

/**
 * Modal type constants
 */
export const MODAL_TYPES = {
  USERS: 'users',
  LIKES: 'likes',
} as const

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]

/**
 * SQL queries for each join type (kept in English as they are code examples)
 */
export const SQL_QUERIES: Record<JoinType, string> = {
  inner:
    'SELECT users.name, likes.like FROM users JOIN likes ON users.id = likes.user_id;',
  left: 'SELECT users.name, likes.like FROM users LEFT JOIN likes ON users.id = likes.user_id;',
  right:
    'SELECT users.name, likes.like FROM users RIGHT JOIN likes ON users.id = likes.user_id;',
  outer:
    'SELECT users.name, likes.like FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id\nUNION\nSELECT users.name, likes.like FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id',
  leftanti:
    'SELECT users.name FROM users LEFT JOIN likes ON users.id = likes.user_id WHERE likes.user_id IS NULL;',
}

/**
 * Initial sample data for users
 * Includes intentional edge cases: some users have no likes (IDs 2 and 5)
 */
export const INITIAL_USERS: User[] = [
  { uuid: crypto.randomUUID(), id: 1, name: 'Patrik' },
  { uuid: crypto.randomUUID(), id: 2, name: 'Albert' },
  { uuid: crypto.randomUUID(), id: 3, name: 'Maria' },
  { uuid: crypto.randomUUID(), id: 4, name: 'Darwin' },
  { uuid: crypto.randomUUID(), id: 5, name: 'Elizabeth' },
]

/**
 * Initial sample data for likes
 * Includes intentional edge case: orphaned like with user_id 6 (no matching user)
 */
export const INITIAL_LIKES: Like[] = [
  { uuid: crypto.randomUUID(), user_id: 3, like: 'Stars' },
  { uuid: crypto.randomUUID(), user_id: 1, like: 'Climbing' },
  { uuid: crypto.randomUUID(), user_id: 1, like: 'Code' },
  { uuid: crypto.randomUUID(), user_id: 6, like: 'Rugby' },
  { uuid: crypto.randomUUID(), user_id: 4, like: 'Apples' },
]
