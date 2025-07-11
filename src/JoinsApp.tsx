import { useState } from 'react';
import { InnerJoinSVG, LeftJoinSVG, RightJoinSVG, OuterJoinSVG } from './JoinSVG';

interface User {
  id: number;
  name: string;
}

interface Like {
  user_id: number;
  like: string;
}

interface JoinResult {
  name: string;
  like: string;
}

type JoinType = 'inner' | 'left' | 'right' | 'outer';

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

const sqlInfo: Record<JoinType, { query: string; desc: string }> = {
  inner: {
    query: "SELECT users.name, likes.like FROM users JOIN likes ON users.id = likes.user_id;",
    desc: "INNER JOIN or just JOIN retrieves all users and likes that match each other (where the id field in users matches a user_id in the likes table and vice versa)"
  },
  left: {
    query: "SELECT users.name, likes.like FROM users LEFT JOIN likes ON users.id = likes.user_id;",
    desc: "LEFT JOIN retrieves all users and its likes. If the like doesn't exist, it sets NULL in the like field"
  },
  right: {
    query: "SELECT users.name, likes.like FROM users RIGHT JOIN likes ON users.id = likes.user_id;",
    desc: "RIGHT JOIN is like LEFT JOIN but retrieves all likes with all matching users or NULL if it doesn't have any matching user"
  },
  outer: {
    query: "SELECT users.name, likes.like FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id\nUNION\nSELECT users.name, likes.like FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id",
    desc: "OUTER JOIN or OUTER LEFT and RIGHT with UNION (MySQL doesn't support FULL OUTER JOIN) retrieves all users and likes, matches them, and sets NULL on any like without a match on user, and vice versa with any user that has no matching like"
  }
};

function getJoins(users: User[], likes: Like[], type: JoinType): { result: JoinResult[]; user_ids: number[] } {
  const userMap: Record<number, string> = Object.fromEntries(users.map(u => [u.id, u.name]));
  let result: JoinResult[] = [];
  let user_ids: number[] = [];
  if (type === 'inner') {
    result = likes
      .filter(l => userMap[l.user_id])
      .map(l => {
        user_ids.push(l.user_id);
        return { name: userMap[l.user_id], like: l.like };
      });
  } else if (type === 'left') {
    result = users.map(u => {
      const userLikes = likes.filter(l => l.user_id === u.id);
      user_ids.push(u.id);
      if (userLikes.length === 0) {
        return { name: u.name, like: 'NULL' };
      }
      return userLikes.map(l => ({ name: u.name, like: l.like }));
    }).flat();
  } else if (type === 'right') {
    result = likes.map(l => {
      user_ids.push(l.user_id);
      return { name: userMap[l.user_id] || 'NULL', like: l.like };
    });
  } else if (type === 'outer') {
    const left = users.map(u => {
      const userLikes = likes.filter(l => l.user_id === u.id);
      user_ids.push(u.id);
      if (userLikes.length === 0) {
        return { name: u.name, like: 'NULL' };
      }
      return userLikes.map(l => ({ name: u.name, like: l.like }));
    }).flat();
    const existingUserIds = [...user_ids]
    const right = likes.map(l => {
      if (!existingUserIds.includes(l.user_id)) {
        user_ids.push(l.user_id);
        return { name: 'NULL', like: l.like };
      }
      return null;
    }).filter(Boolean) as JoinResult[];
    result = [...left, ...right];
  }
  return { result, user_ids };
}

function JoinsApp() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [likes, setLikes] = useState<Like[]>(likesData);
  const [currentJoin, setCurrentJoin] = useState<JoinType>('inner');
  const [showDesc, setShowDesc] = useState(false);
  const [modalType, setModalType] = useState<'users' | 'likes' | null>(null);
  const [addId, setAddId] = useState('');
  const [addName, setAddName] = useState('');

  const { result: joins, user_ids } = getJoins(users, likes, currentJoin);

  const isNotSelected = (id: number) => {
    if (!user_ids.includes(id)) return 'is-not-selected';
    return '';
  };

  const currentJoinClass = (join: JoinType) =>
    'join' + (currentJoin === join ? ' current-join' : '');

  const selectJoin = (join: JoinType) => {
    setCurrentJoin(join);
    setShowDesc(false);
  };

  const removeItem = (type: 'users' | 'likes', idx: number) => {
    if (type === 'users') {
      setUsers(users.filter((_, i) => i !== idx));
    } else {
      setLikes(likes.filter((_, i) => i !== idx));
    }
  };

  const addModal = (type: 'users' | 'likes') => {
    setModalType(type);
    setAddId('');
    setAddName('');
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'users') {
      if (!addId || !addName) return;
      setUsers([...users, { id: Number(addId), name: addName }]);
    } else if (modalType === 'likes') {
      if (!addId || !addName) return;
      setLikes([...likes, { user_id: Number(addId), like: addName }]);
    }
    setModalType(null);
  };

  return (
    <div className="container">
      <h1 className="title">
        Visual JOIN
        <span>Understand how joins work by interacting and see it visually</span>
      </h1>
      <div className="row joins clearfix">
        <div className="col-xs-3">
          <div className={currentJoinClass('inner')} onClick={() => selectJoin('inner')}>
            <h2 title={sqlInfo.inner.query}>INNER JOIN</h2>
            <div className="subtitle">(or JOIN)</div>
            <InnerJoinSVG />
          </div>
        </div>
        <div className="col-xs-3">
          <div className={currentJoinClass('left')} onClick={() => selectJoin('left')}>
            <h2>LEFT JOIN</h2>
            <div className="subtitle">&nbsp;</div>
            <LeftJoinSVG />
          </div>
        </div>
        <div className="col-xs-3">
          <div className={currentJoinClass('right')} onClick={() => selectJoin('right')}>
            <h2>RIGHT JOIN</h2>
            <div className="subtitle">&nbsp;</div>
            <RightJoinSVG />
          </div>
        </div>
        <div className="col-xs-3">
          <div className={currentJoinClass('outer')} onClick={() => selectJoin('outer')}>
            <h2>OUTER JOIN</h2>
            <div className="subtitle">(with UNION)</div>
            <OuterJoinSVG />
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="col-xs-12">
        <div className="sql-table">
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="sql">{sqlInfo[currentJoin].query.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</span>
                  <span className="show-desc" onClick={() => setShowDesc(!showDesc)}>
                    {showDesc ? 'Hide description »' : 'Description »'}
                  </span>
                  {showDesc && <span className="desc">{sqlInfo[currentJoin].desc}</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
          <button onClick={() => addModal('users')}>Add</button>
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
          <button onClick={() => addModal('likes')}>Add</button>
        </div>
      </div>
      {/* Modal */}
      {modalType && (
        <div className="modal" style={{ display: 'block' }}>
          <form onSubmit={addItem}>
            <input
              type="text"
              id="addId"
              value={addId}
              onChange={e => setAddId(e.target.value)}
              placeholder="ID"
              className="input-sm"
            />
            <input
              type="text"
              value={addName}
              onChange={e => setAddName(e.target.value)}
              placeholder={modalType === 'likes' ? 'Like' : 'Name'}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      {modalType && <div className="overlay" onClick={() => setModalType(null)}></div>}
      <div className="footer">
        &copy; 2025 <a href="http://spathon.com">Spathon</a>
        <div className="pull-right">
          <a href="https://github.com/spathon/Visual-JOIN">Github</a>
        </div>
      </div>
    </div>
  );
}

export default JoinsApp;
