import { useState } from 'preact/hooks'
import ModalAdd from './ModalAdd'
import type { JoinType, Like, User } from './types'
import getJoins from './utils/getJoins'

const usersData: User[] = [
  { uuid: crypto.randomUUID(), id: 1, name: 'Patrik' },
  { uuid: crypto.randomUUID(), id: 2, name: 'Albert' },
  { uuid: crypto.randomUUID(), id: 3, name: 'Maria' },
  { uuid: crypto.randomUUID(), id: 4, name: 'Darwin' },
  { uuid: crypto.randomUUID(), id: 5, name: 'Elizabeth' },
]

const likesData: Like[] = [
  { uuid: crypto.randomUUID(), user_id: 3, like: 'Stars' },
  { uuid: crypto.randomUUID(), user_id: 1, like: 'Climbing' },
  { uuid: crypto.randomUUID(), user_id: 1, like: 'Code' },
  { uuid: crypto.randomUUID(), user_id: 6, like: 'Rugby' },
  { uuid: crypto.randomUUID(), user_id: 4, like: 'Apples' },
]

export default function Tables({ currentJoin }: { currentJoin: JoinType }) {
  const [users, setUsers] = useState<User[]>(usersData)
  const [likes, setLikes] = useState<Like[]>(likesData)
  const [modalType, setModalType] = useState<'users' | 'likes' | null>(null)

  const { result: joins, user_ids } = getJoins(users, likes, currentJoin)

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user])
  }
  const addLike = (like: Like) => {
    setLikes((prev) => [...prev, like])
  }
  const closeModal = () => setModalType(null)

  const removeItem = (type: 'users' | 'likes', uuid: string) => {
    if (type === 'users') {
      setUsers(users.filter((user) => user.uuid !== uuid))
    } else {
      setLikes(likes.filter((like) => like.uuid !== uuid))
    }
  }

  const isNotSelected = (id: number) => {
    if (!user_ids.includes(id)) return 'is-not-selected'
    return ''
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
                <tr key={user.id} className={isNotSelected(user.id)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td width="1">
                    <button
                      aria-label="Remove user"
                      type="button"
                      className="button danger"
                      onClick={() => removeItem('users', user.uuid)}
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
            onClick={() => setModalType('users')}
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
                      onClick={() => removeItem('likes', like.uuid)}
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
            onClick={() => setModalType('likes')}
          >
            Add
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalType && (
        <ModalAdd
          modalType={modalType}
          addUser={addUser}
          addLike={addLike}
          closeModal={closeModal}
        />
      )}

      {modalType && (
        // biome-ignore lint/a11y/useSemanticElements: Overlay
        <div
          className="overlay"
          role="button"
          tabIndex={0}
          onKeyDown={closeModal}
          onClick={closeModal}
        ></div>
      )}
    </>
  )
}
