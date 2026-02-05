import type { Translations } from '../types'

const en: Translations = {
  // Header
  title: 'Visual JOIN',
  subtitle: 'Understand how joins work by interacting and see it visually',

  // Join types
  innerJoin: 'INNER JOIN',
  leftJoin: 'LEFT JOIN',
  leftAntiJoin: 'LEFT ANTI JOIN',
  rightJoin: 'RIGHT JOIN',
  outerJoin: 'OUTER JOIN',

  // Join subtitles
  orJoin: '(or JOIN)',
  withWhereIsNull: '(with WHERE IS NULL)',
  withUnion: '(with UNION)',

  // Join descriptions
  innerJoinDesc:
    'INNER JOIN or just JOIN retrieves all users and likes that match each other (where the id field in users matches a user_id in the likes table and vice versa)',
  leftJoinDesc:
    "LEFT JOIN retrieves all users and its likes. If the like doesn't exist, it sets NULL in the like field",
  leftAntiJoinDesc:
    'LEFT ANTI JOIN finds users that have NO matching likes. It uses LEFT JOIN with a WHERE IS NULL clause to filter out all matches, keeping only the unmatched rows from the left table (users with no likes)',
  rightJoinDesc:
    "RIGHT JOIN is like LEFT JOIN but retrieves all likes with all matching users or NULL if it doesn't have any matching user",
  outerJoinDesc:
    "OUTER JOIN or OUTER LEFT and RIGHT with UNION (MySQL doesn't support FULL OUTER JOIN) retrieves all users and likes, matches them, and sets NULL on any like without a match on user, and vice versa with any user that has no matching like",

  // Tables
  users: 'Users',
  likes: 'Likes',
  join: 'JOIN',
  id: 'ID',
  name: 'Name',
  userId: 'User ID',
  like: 'Like',

  // Actions
  add: 'Add',
  remove: 'Remove',
  description: 'Description',
  hideDescription: 'Hide description',

  // Aria labels
  removeUser: 'Remove user',
  removeLike: 'Remove like',
  addUser: 'Add user',
  addLike: 'Add like',

  // SVG titles
  innerJoinTitle: 'Inner join',
  leftJoinTitle: 'Left join',
  leftAntiJoinTitle: 'Left anti join',
  rightJoinTitle: 'Right join',
  outerJoinTitle: 'Outer join',

  // Language
  language: 'Language',

  // Theme
  toggleTheme: 'Toggle theme',
}

export default en
