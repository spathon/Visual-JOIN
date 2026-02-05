import type { Translations } from '../types'

const de: Translations = {
  // Header
  title: 'Visual JOIN',
  subtitle:
    'Verstehe wie Joins funktionieren durch Interaktion und visuelle Darstellung',

  // Join types
  innerJoin: 'INNER JOIN',
  leftJoin: 'LEFT JOIN',
  leftAntiJoin: 'LEFT ANTI JOIN',
  rightJoin: 'RIGHT JOIN',
  outerJoin: 'OUTER JOIN',

  // Join subtitles
  orJoin: '(oder JOIN)',
  withWhereIsNull: '(mit WHERE IS NULL)',
  withUnion: '(mit UNION)',

  // Join descriptions
  innerJoinDesc:
    'INNER JOIN oder einfach JOIN ruft alle Benutzer und Likes ab, die übereinstimmen (wo das id-Feld in Benutzern mit einer user_id in der Likes-Tabelle übereinstimmt und umgekehrt)',
  leftJoinDesc:
    'LEFT JOIN ruft alle Benutzer und ihre Likes ab. Wenn der Like nicht existiert, wird NULL im Like-Feld gesetzt',
  leftAntiJoinDesc:
    'LEFT ANTI JOIN findet Benutzer, die KEINE übereinstimmenden Likes haben. Es verwendet LEFT JOIN mit einer WHERE IS NULL-Klausel, um alle Übereinstimmungen herauszufiltern und nur die nicht übereinstimmenden Zeilen der linken Tabelle zu behalten (Benutzer ohne Likes)',
  rightJoinDesc:
    'RIGHT JOIN ist wie LEFT JOIN, ruft aber alle Likes mit allen übereinstimmenden Benutzern ab oder NULL, wenn kein übereinstimmender Benutzer vorhanden ist',
  outerJoinDesc:
    'OUTER JOIN oder OUTER LEFT und RIGHT mit UNION (MySQL unterstützt kein FULL OUTER JOIN) ruft alle Benutzer und Likes ab, ordnet sie zu und setzt NULL bei jedem Like ohne übereinstimmenden Benutzer und umgekehrt bei jedem Benutzer ohne übereinstimmenden Like',

  // Tables
  users: 'Benutzer',
  likes: 'Likes',
  join: 'JOIN',
  id: 'ID',
  name: 'Name',
  userId: 'Benutzer-ID',
  like: 'Like',

  // Actions
  add: 'Hinzufügen',
  remove: 'Entfernen',
  description: 'Beschreibung',
  hideDescription: 'Beschreibung ausblenden',

  // Aria labels
  removeUser: 'Benutzer entfernen',
  removeLike: 'Like entfernen',
  addUser: 'Benutzer hinzufügen',
  addLike: 'Like hinzufügen',

  // SVG titles
  innerJoinTitle: 'Inner join',
  leftJoinTitle: 'Left join',
  leftAntiJoinTitle: 'Left anti join',
  rightJoinTitle: 'Right join',
  outerJoinTitle: 'Outer join',

  // Language
  language: 'Sprache',

  // Theme
  toggleTheme: 'Design wechseln',
}

export default de
