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
 * SQL query information for each join type
 */
export const SQL_INFO: Record<JoinType, { query: string; desc: string }> = {
  inner: {
    query:
      'SELECT users.name, likes.like FROM users JOIN likes ON users.id = likes.user_id;',
    desc: 'INNER JOIN or just JOIN retrieves all users and likes that match each other (where the id field in users matches a user_id in the likes table and vice versa)',
  },
  left: {
    query:
      'SELECT users.name, likes.like FROM users LEFT JOIN likes ON users.id = likes.user_id;',
    desc: "LEFT JOIN retrieves all users and its likes. If the like doesn't exist, it sets NULL in the like field",
  },
  right: {
    query:
      'SELECT users.name, likes.like FROM users RIGHT JOIN likes ON users.id = likes.user_id;',
    desc: "RIGHT JOIN is like LEFT JOIN but retrieves all likes with all matching users or NULL if it doesn't have any matching user",
  },
  outer: {
    query:
      'SELECT users.name, likes.like FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id\nUNION\nSELECT users.name, likes.like FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id',
    desc: "OUTER JOIN or OUTER LEFT and RIGHT with UNION (MySQL doesn't support FULL OUTER JOIN) retrieves all users and likes, matches them, and sets NULL on any like without a match on user, and vice versa with any user that has no matching like",
  },
  leftanti: {
    query:
      'SELECT users.name FROM users LEFT JOIN likes ON users.id = likes.user_id WHERE likes.user_id IS NULL;',
    desc: 'LEFT ANTI JOIN finds users that have NO matching likes. It uses LEFT JOIN with a WHERE IS NULL clause to filter out all matches, keeping only the unmatched rows from the left table (users with no likes)',
  },
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
