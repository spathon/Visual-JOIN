import { useMemo, useState } from 'preact/hooks'
import {
  INITIAL_LIKES,
  INITIAL_USERS,
  MODAL_TYPES,
  type ModalType,
} from './constants'
import ModalAdd from './ModalAdd'
import type { JoinType, Like, User } from './types'
import getJoins from './utils/getJoins'

/**
 * Tables component that displays Users, JOIN result, and Likes tables side-by-side
 * Allows interactive adding/removing of data to see how join results change
 */
export default function Tables({ currentJoin }: { currentJoin: JoinType }) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [likes, setLikes] = useState<Like[]>(INITIAL_LIKES)
  const [modalType, setModalType] = useState<ModalType | null>(null)

  // Memoize join computation to avoid unnecessary recalculations
  const { result: joins, user_ids } = useMemo(
    () => getJoins(users, likes, currentJoin),
    [users, likes, currentJoin],
  )

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user])
  }
  const addLike = (like: Like) => {
    setLikes((prev) => [...prev, like])
  }
  const closeModal = () => setModalType(null)

  const removeItem = (type: ModalType, uuid: string) => {
    if (type === MODAL_TYPES.USERS) {
      setUsers(users.filter((user) => user.uuid !== uuid))
    } else {
      setLikes(likes.filter((like) => like.uuid !== uuid))
    }
  }

  /**
   * Returns className for rows that are not included in the current join
   */
  const isNotSelected = (id: number) => {
    return user_ids.includes(id) ? '' : 'is-not-selected'
  }

  return (
    <>
      <div className="tables">
        {/* Users */}
        <div className="tables-col">
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th className="user">Name</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uuid} className={isNotSelected(user.id)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td width="1">
                    <button
                      aria-label="Remove user"
                      type="button"
                      className="button danger"
                      onClick={() => removeItem(MODAL_TYPES.USERS, user.uuid)}
                    >
                      &#10005;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            aria-label="Add user"
            className="button"
            type="button"
            onClick={() => setModalType(MODAL_TYPES.USERS)}
          >
            Add
          </button>
        </div>

        {/* Join */}
        <div className="tables-col">
          <h3>JOIN</h3>
          <table>
            <thead>
              <tr>
                <th className="user">Name</th>
                <th className="like">Like</th>
              </tr>
            </thead>
            <tbody>
              {joins.map((join) => (
                <tr key={join.uuid}>
                  <td className={join.name === 'NULL' ? 'is-null' : ''}>
                    {join.name}
                  </td>
                  <td className={join.like === 'NULL' ? 'is-null' : ''}>
                    {join.like}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Likes */}
        <div className="tables-col">
          <h3>Likes</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th className="like">Like</th>
              </tr>
            </thead>
            <tbody>
              {likes.map((like) => (
                <tr key={like.uuid} className={isNotSelected(like.user_id)}>
                  <td>{like.user_id}</td>
                  <td>{like.like}</td>
                  <td width="1">
                    <button
                      aria-label="Remove like"
                      type="button"
                      className="button danger"
                      onClick={() => removeItem(MODAL_TYPES.LIKES, like.uuid)}
                    >
                      &#10005;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            aria-label="Add like"
            className="button"
            type="button"
            onClick={() => setModalType(MODAL_TYPES.LIKES)}
          >
            Add
          </button>
        </div>
      </div>

      {/* Modal and Overlay */}
      {modalType && (
        <>
          <ModalAdd
            modalType={modalType}
            addUser={addUser}
            addLike={addLike}
            closeModal={closeModal}
            defaultId={
              modalType === MODAL_TYPES.USERS
                ? Math.max(0, ...users.map((u) => u.id)) + 1
                : Math.max(0, ...likes.map((l) => l.user_id)) + 1
            }
          />
          {/* biome-ignore lint/a11y/useSemanticElements: Overlay backdrop for modal */}
          <div
            className="overlay"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                closeModal()
              }
            }}
            onClick={closeModal}
          />
        </>
      )}
    </>
  )
}
