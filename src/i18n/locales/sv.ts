import type { Translations } from '../types'

const sv: Translations = {
  // Header
  title: 'Visual JOIN',
  subtitle:
    'Forstå hur joins fungerar genom att interagera och se det visuellt',

  // Join types
  innerJoin: 'INNER JOIN',
  leftJoin: 'LEFT JOIN',
  leftAntiJoin: 'LEFT ANTI JOIN',
  rightJoin: 'RIGHT JOIN',
  outerJoin: 'OUTER JOIN',

  // Join subtitles
  orJoin: '(eller JOIN)',
  withWhereIsNull: '(med WHERE IS NULL)',
  withUnion: '(med UNION)',

  // Join descriptions
  innerJoinDesc:
    'INNER JOIN eller bara JOIN hämtar alla användare och likes som matchar varandra (där id-fältet i users matchar ett user_id i likes-tabellen och vice versa)',
  leftJoinDesc:
    'LEFT JOIN hämtar alla användare och dess likes. Om liken inte finns sätts NULL i like-fältet',
  leftAntiJoinDesc:
    'LEFT ANTI JOIN hittar användare som INTE har några matchande likes. Den använder LEFT JOIN med en WHERE IS NULL-klausul för att filtrera bort alla matchningar och behåller endast de omatchade raderna från vänster tabell (användare utan likes)',
  rightJoinDesc:
    'RIGHT JOIN är som LEFT JOIN men hämtar alla likes med alla matchande användare eller NULL om det inte finns någon matchande användare',
  outerJoinDesc:
    'OUTER JOIN eller OUTER LEFT och RIGHT med UNION (MySQL stödjer inte FULL OUTER JOIN) hämtar alla användare och likes, matchar dem, och sätter NULL på alla likes utan matchning på användare, och vice versa med alla användare som inte har någon matchande like',

  // Tables
  users: 'Användare',
  likes: 'Likes',
  join: 'JOIN',
  id: 'ID',
  name: 'Namn',
  userId: 'Användar-ID',
  like: 'Like',

  // Actions
  add: 'Lägg till',
  remove: 'Ta bort',
  description: 'Beskrivning',
  hideDescription: 'Dölj beskrivning',

  // Aria labels
  removeUser: 'Ta bort användare',
  removeLike: 'Ta bort like',
  addUser: 'Lägg till användare',
  addLike: 'Lägg till like',

  // SVG titles
  innerJoinTitle: 'Inner join',
  leftJoinTitle: 'Left join',
  leftAntiJoinTitle: 'Left anti join',
  rightJoinTitle: 'Right join',
  outerJoinTitle: 'Outer join',

  // Language
  language: 'Språk',

  // Theme
  toggleTheme: 'Byt tema',
}

export default sv
