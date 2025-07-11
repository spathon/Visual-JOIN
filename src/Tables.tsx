import { useState } from 'react'
import type { JoinType, Like, User } from './types'
import getJoins from './utils/getJoins'
import ModalAdd from './ModalAdd'

const usersData: User[] = [
  { id: 1, name: 'Patrik' },
  { id: 2, name: 'Albert' },
  { id: 3, name: 'Maria' },
  { id: 4, name: 'Darwin' },
  { id: 5, name: 'Elizabeth' }
];

const likesData: Like[] = [
  { user_id: 3, like: 'Stars' },
  { user_id: 1, like: 'Climbing' },
  { user_id: 1, like: 'Code' },
  { user_id: 6, like: 'Rugby' },
  { user_id: 4, like: 'Apples' }
];

export default function Tables({ currentJoin }: { currentJoin: JoinType; }) {
  const [users, setUsers] = useState<User[]>(usersData);
  const [likes, setLikes] = useState<Like[]>(likesData);
  const [modalType, setModalType] = useState<'users' | 'likes' | null>(null);

  const { result: joins, user_ids } = getJoins(users, likes, currentJoin);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };
  const addLike = (like: Like) => {
    setLikes((prev) => [...prev, like]);
  };
  const closeModal = () => setModalType(null);

  const removeItem = (type: 'users' | 'likes', idx: number) => {
    if (type === 'users') {
      setUsers(users.filter((_, i) => i !== idx));
    } else {
      setLikes(likes.filter((_, i) => i !== idx));
    }
  };

  const isNotSelected = (id: number) => {
    if (!user_ids.includes(id)) return 'is-not-selected';
    return '';
  };

  return (
    <>
    <div className="row tables clearfix">
        {/* Users */}
        <div className="col-sm-4">
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th className="user">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={isNotSelected(user.id)}>
                  <td>{user.id}</td>
                  <td>
                    <button type="button" className="pull-right danger" onClick={() => removeItem('users', idx)}>X</button>
                    {user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setModalType('users')}>Add</button>
        </div>
        {/* Join */}
        <div className="col-sm-4 joins-table">
          <h3>JOIN</h3>
          <table>
            <thead>
              <tr>
                <th className="user">Name</th>
                <th className="like">Like</th>
              </tr>
            </thead>
            <tbody>
              {joins.map((join, idx) => (
                <tr key={idx}>
                  <td className={join.name === 'NULL' ? 'is-null' : ''}>{join.name}</td>
                  <td className={join.like === 'NULL' ? 'is-null' : ''}>{join.like}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Likes */}
        <div className="col-sm-4">
          <h3>Likes</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th className="like">Like</th>
              </tr>
            </thead>
            <tbody>
              {likes.map((like, idx) => (
                <tr key={idx} className={isNotSelected(like.user_id)}>
                  <td>{like.user_id}</td>
                  <td>
                    <button type="button" className="pull-right danger" onClick={() => removeItem('likes', idx)}>X</button>
                    {like.like}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setModalType('likes')}>Add</button>
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
      {modalType && <div className="overlay" onClick={closeModal}></div>}
    </>
  );
}
