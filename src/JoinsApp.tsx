import { useState } from 'react';
import { InnerJoinSVG, LeftJoinSVG, RightJoinSVG, OuterJoinSVG } from './JoinSVG';
import type { JoinType } from './types'
import Tables from './Tables'

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

function JoinsApp() {
  const [currentJoin, setCurrentJoin] = useState<JoinType>('inner');
  const [showDesc, setShowDesc] = useState(false);

  const currentJoinClass = (join: JoinType) =>
    'join' + (currentJoin === join ? ' current-join' : '');

  const selectJoin = (join: JoinType) => {
    setCurrentJoin(join);
    setShowDesc(false);
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
            <h2>INNER JOIN</h2>
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

      <Tables currentJoin={currentJoin} />

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
