import type { JoinType, Like, User } from '../types'

interface JoinResult {
  uuid: string
  name: string
  like: string
}

/**
 * Type guard to filter out null values from an array
 */
function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

/**
 * Performs SQL JOIN operations on users and likes data
 * @param users - Array of user records
 * @param likes - Array of like records
 * @param type - Type of join to perform (inner, left, right, outer, leftanti)
 * @returns Object containing the join result and array of participating user IDs
 */
export default function getJoins(
  users: User[],
  likes: Like[],
  type: JoinType,
): { result: JoinResult[]; user_ids: number[] } {
  // Build lookup maps for O(1) access - improves performance from O(n×m) to O(n+m)
  const userMap = new Map<number, string>(users.map((u) => [u.id, u.name]))
  const likesByUserId = new Map<number, Like[]>()

  for (const like of likes) {
    if (!likesByUserId.has(like.user_id)) likesByUserId.set(like.user_id, [])
    likesByUserId.get(like.user_id)?.push(like)
  }

  let result: JoinResult[] = []
  const user_ids: number[] = []

  if (type === 'inner') {
    result = likes
      .filter((l) => userMap.has(l.user_id))
      .map((l) => {
        user_ids.push(l.user_id)
        const name = userMap.get(l.user_id) || 'NULL'
        return { uuid: l.uuid, name, like: l.like }
      })
  } else if (type === 'left') {
    result = users.flatMap((u) => {
      const userLikes = likesByUserId.get(u.id) || []
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
      return {
        uuid: l.uuid,
        name: userMap.get(l.user_id) || 'NULL',
        like: l.like,
      }
    })
  } else if (type === 'outer') {
    const left = users.flatMap((u) => {
      const userLikes = likesByUserId.get(u.id) || []
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
    const existingUserIds = new Set(user_ids)
    const right = likes
      .map((l) => {
        if (!existingUserIds.has(l.user_id)) {
          user_ids.push(l.user_id)
          return { uuid: l.uuid, name: 'NULL', like: l.like }
        }
        return null
      })
      .filter(isNotNull)
    result = [...left, ...right]
  } else if (type === 'leftanti') {
    // LEFT ANTI JOIN: Find users that have NO matching likes
    result = users
      .filter((u) => !likesByUserId.has(u.id))
      .map((u) => {
        user_ids.push(u.id)
        return { uuid: u.uuid, name: u.name, like: 'NULL' }
      })
  }
  return { result, user_ids }
}
