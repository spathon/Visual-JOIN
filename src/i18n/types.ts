export interface Translations {
  // Header
  title: string
  subtitle: string

  // Join types
  innerJoin: string
  leftJoin: string
  leftAntiJoin: string
  rightJoin: string
  outerJoin: string

  // Join subtitles
  orJoin: string
  withWhereIsNull: string
  withUnion: string

  // Join descriptions
  innerJoinDesc: string
  leftJoinDesc: string
  leftAntiJoinDesc: string
  rightJoinDesc: string
  outerJoinDesc: string

  // Tables
  users: string
  likes: string
  join: string
  id: string
  name: string
  userId: string
  like: string

  // Actions
  add: string
  remove: string
  description: string
  hideDescription: string

  // Aria labels
  removeUser: string
  removeLike: string
  addUser: string
  addLike: string

  // SVG titles
  innerJoinTitle: string
  leftJoinTitle: string
  leftAntiJoinTitle: string
  rightJoinTitle: string
  outerJoinTitle: string

  // Language
  language: string

  // Theme
  toggleTheme: string
}

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'sv'

export const LOCALES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  sv: 'Svenska',
}

export const DEFAULT_LOCALE: Locale = 'en'
