import type { Translations } from '../types'

const pt: Translations = {
  // Header
  title: 'Visual JOIN',
  subtitle: 'Entenda como os JOINs funcionam de forma interativa e visual',

  // Join types
  innerJoin: 'INNER JOIN',
  leftJoin: 'LEFT JOIN',
  leftAntiJoin: 'LEFT ANTI JOIN',
  rightJoin: 'RIGHT JOIN',
  outerJoin: 'OUTER JOIN',

  // Join subtitles
  orJoin: '(ou JOIN)',
  withWhereIsNull: '(com WHERE IS NULL)',
  withUnion: '(com UNION)',

  // Join descriptions
  innerJoinDesc:
    'INNER JOIN, ou apenas JOIN, retorna todos os usuários e curtidas que correspondem entre si (quando o campo id em users corresponde ao campo user_id na tabela likes e vice-versa)',
  leftJoinDesc:
    'LEFT JOIN retorna todos os usuários e suas curtidas. Se a curtida não existir, o valor NULL é definido no campo de curtida',
  leftAntiJoinDesc:
    'LEFT ANTI JOIN encontra usuários que NÃO possuem curtidas correspondentes. Ele utiliza LEFT JOIN com uma cláusula WHERE IS NULL para filtrar todas as correspondências, mantendo apenas as linhas não correspondentes da tabela à esquerda (usuários sem curtidas)',
  rightJoinDesc:
    'RIGHT JOIN é semelhante ao LEFT JOIN, mas retorna todas as curtidas com seus usuários correspondentes ou NULL caso não exista usuário correspondente',
  outerJoinDesc:
    'OUTER JOIN, ou LEFT e RIGHT combinados com UNION (MySQL não suporta FULL OUTER JOIN), retorna todos os usuários e curtidas, realiza as correspondências e define NULL em qualquer curtida sem usuário correspondente, e vice-versa para usuários sem curtida correspondente',

  // Tables
  users: 'Usuários',
  likes: 'Curtidas',
  join: 'JOIN',
  id: 'ID',
  name: 'Nome',
  userId: 'ID do Usuário',
  like: 'Curtida',

  // Actions
  add: 'Adicionar',
  remove: 'Remover',
  description: 'Descrição',
  hideDescription: 'Ocultar descrição',

  // Aria labels
  removeUser: 'Remover usuário',
  removeLike: 'Remover curtida',
  addUser: 'Adicionar usuário',
  addLike: 'Adicionar curtida',

  // SVG titles
  innerJoinTitle: 'Inner join',
  leftJoinTitle: 'Left join',
  leftAntiJoinTitle: 'Left anti join',
  rightJoinTitle: 'Right join',
  outerJoinTitle: 'Outer join',

  // Language
  language: 'Idioma',

  // Theme
  toggleTheme: 'Alternar tema',
}

export default pt
