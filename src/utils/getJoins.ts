import type { JoinType, Like, User } from '../types'

interface JoinResult {
  uuid: string
  name: string
  like: string
}

export default function getJoins(
  users: User[],
  likes: Like[],
  type: JoinType,
): { result: JoinResult[]; user_ids: number[] } {
  const userMap: Record<number, string> = Object.fromEntries(
    users.map((u) => [u.id, u.name]),
  )
  let result: JoinResult[] = []
  const user_ids: number[] = []
  if (type === 'inner') {
    result = likes
      .filter((l) => userMap[l.user_id])
      .map((l) => {
        user_ids.push(l.user_id)
        return { uuid: l.uuid, name: userMap[l.user_id], like: l.like }
      })
  } else if (type === 'left') {
    result = users.flatMap((u) => {
      const userLikes = likes.filter((l) => l.user_id === u.id)
      user_ids.push(u.id)
      if (userLikes.length === 0) {
        return { uuid: u.uuid, name: u.name, like: 'NULL' }
      }
      return userLikes.map((l) => ({
        uuid: l.uuid,
        name: u.name,
        like: l.like,
      }))
    })
  } else if (type === 'right') {
    result = likes.map((l) => {
      user_ids.push(l.user_id)
      return { uuid: l.uuid, name: userMap[l.user_id] || 'NULL', like: l.like }
    })
  } else if (type === 'outer') {
    const left = users.flatMap((u) => {
      const userLikes = likes.filter((l) => l.user_id === u.id)
      user_ids.push(u.id)
      if (userLikes.length === 0) {
        return { uuid: u.uuid, name: u.name, like: 'NULL' }
      }
      return userLikes.map((l) => ({
        uuid: l.uuid,
        name: u.name,
        like: l.like,
      }))
    })
    const existingUserIds = [...user_ids]
    const right = likes
      .map((l) => {
        if (!existingUserIds.includes(l.user_id)) {
          user_ids.push(l.user_id)
          return { uuid: l.uuid, name: 'NULL', like: l.like }
        }
        return null
      })
      .filter((val) => val !== null)
    result = [...left, ...right]
  }
  return { result, user_ids }
}
