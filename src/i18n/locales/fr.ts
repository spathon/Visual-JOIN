import type { Translations } from '../types'

const fr: Translations = {
  // Header
  title: 'Visual JOIN',
  subtitle:
    'Comprenez comment fonctionnent les jointures en interagissant et en les visualisant',

  // Join types
  innerJoin: 'INNER JOIN',
  leftJoin: 'LEFT JOIN',
  leftAntiJoin: 'LEFT ANTI JOIN',
  rightJoin: 'RIGHT JOIN',
  outerJoin: 'OUTER JOIN',

  // Join subtitles
  orJoin: '(ou JOIN)',
  withWhereIsNull: '(avec WHERE IS NULL)',
  withUnion: '(avec UNION)',

  // Join descriptions
  innerJoinDesc:
    'INNER JOIN ou simplement JOIN récupère tous les utilisateurs et likes qui correspondent (où le champ id des utilisateurs correspond à un user_id dans la table des likes et vice versa)',
  leftJoinDesc:
    "LEFT JOIN récupère tous les utilisateurs et leurs likes. Si le like n'existe pas, il définit NULL dans le champ like",
  leftAntiJoinDesc:
    "LEFT ANTI JOIN trouve les utilisateurs qui n'ont PAS de likes correspondants. Il utilise LEFT JOIN avec une clause WHERE IS NULL pour filtrer toutes les correspondances, ne gardant que les lignes sans correspondance de la table de gauche (utilisateurs sans likes)",
  rightJoinDesc:
    "RIGHT JOIN est comme LEFT JOIN mais récupère tous les likes avec tous les utilisateurs correspondants ou NULL s'il n'y a pas d'utilisateur correspondant",
  outerJoinDesc:
    'OUTER JOIN ou OUTER LEFT et RIGHT avec UNION (MySQL ne supporte pas FULL OUTER JOIN) récupère tous les utilisateurs et likes, les associe, et définit NULL sur tout like sans correspondance avec un utilisateur, et vice versa pour tout utilisateur sans like correspondant',

  // Tables
  users: 'Utilisateurs',
  likes: 'Likes',
  join: 'JOIN',
  id: 'ID',
  name: 'Nom',
  userId: 'ID Utilisateur',
  like: 'Like',

  // Actions
  add: 'Ajouter',
  remove: 'Supprimer',
  description: 'Description',
  hideDescription: 'Masquer la description',

  // Aria labels
  removeUser: 'Supprimer utilisateur',
  removeLike: 'Supprimer like',
  addUser: 'Ajouter utilisateur',
  addLike: 'Ajouter like',

  // SVG titles
  innerJoinTitle: 'Inner join',
  leftJoinTitle: 'Left join',
  leftAntiJoinTitle: 'Left anti join',
  rightJoinTitle: 'Right join',
  outerJoinTitle: 'Outer join',

  // Language
  language: 'Langue',
}

export default fr
