import type { Translations } from '../types'

const es: Translations = {
  // Header
  title: 'Visual JOIN',
  subtitle:
    'Entiende cómo funcionan los joins interactuando y viéndolo visualmente',

  // Join types
  innerJoin: 'INNER JOIN',
  leftJoin: 'LEFT JOIN',
  leftAntiJoin: 'LEFT ANTI JOIN',
  rightJoin: 'RIGHT JOIN',
  outerJoin: 'OUTER JOIN',

  // Join subtitles
  orJoin: '(o JOIN)',
  withWhereIsNull: '(con WHERE IS NULL)',
  withUnion: '(con UNION)',

  // Join descriptions
  innerJoinDesc:
    'INNER JOIN o simplemente JOIN obtiene todos los usuarios y likes que coinciden entre sí (donde el campo id en usuarios coincide con un user_id en la tabla de likes y viceversa)',
  leftJoinDesc:
    'LEFT JOIN obtiene todos los usuarios y sus likes. Si el like no existe, establece NULL en el campo like',
  leftAntiJoinDesc:
    'LEFT ANTI JOIN encuentra usuarios que NO tienen likes coincidentes. Usa LEFT JOIN con una cláusula WHERE IS NULL para filtrar todas las coincidencias, manteniendo solo las filas sin coincidencia de la tabla izquierda (usuarios sin likes)',
  rightJoinDesc:
    'RIGHT JOIN es como LEFT JOIN pero obtiene todos los likes con todos los usuarios coincidentes o NULL si no tiene ningún usuario coincidente',
  outerJoinDesc:
    'OUTER JOIN o OUTER LEFT y RIGHT con UNION (MySQL no soporta FULL OUTER JOIN) obtiene todos los usuarios y likes, los empareja, y establece NULL en cualquier like sin coincidencia con usuario, y viceversa con cualquier usuario que no tenga like coincidente',

  // Tables
  users: 'Usuarios',
  likes: 'Likes',
  join: 'JOIN',
  id: 'ID',
  name: 'Nombre',
  userId: 'ID Usuario',
  like: 'Like',

  // Actions
  add: 'Agregar',
  remove: 'Eliminar',
  description: 'Descripción',
  hideDescription: 'Ocultar descripción',

  // Aria labels
  removeUser: 'Eliminar usuario',
  removeLike: 'Eliminar like',
  addUser: 'Agregar usuario',
  addLike: 'Agregar like',

  // SVG titles
  innerJoinTitle: 'Inner join',
  leftJoinTitle: 'Left join',
  leftAntiJoinTitle: 'Left anti join',
  rightJoinTitle: 'Right join',
  outerJoinTitle: 'Outer join',

  // Language
  language: 'Idioma',

  // Theme
  toggleTheme: 'Cambiar tema',
}

export default es
