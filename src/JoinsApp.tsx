import { useState } from 'preact/hooks'
import {
  InnerJoinSVG,
  LeftAntiJoinSVG,
  LeftJoinSVG,
  OuterJoinSVG,
  RightJoinSVG,
} from './JoinSVG'
import Tables from './Tables'
import type { JoinType } from './types'

const sqlInfo: Record<JoinType, { query: string; desc: string }> = {
  inner: {
    query:
      'SELECT users.name, likes.like FROM users JOIN likes ON users.id = likes.user_id;',
    desc: 'INNER JOIN or just JOIN retrieves all users and likes that match each other (where the id field in users matches a user_id in the likes table and vice versa)',
  },
  left: {
    query:
      'SELECT users.name, likes.like FROM users LEFT JOIN likes ON users.id = likes.user_id;',
    desc: "LEFT JOIN retrieves all users and its likes. If the like doesn't exist, it sets NULL in the like field",
  },
  right: {
    query:
      'SELECT users.name, likes.like FROM users RIGHT JOIN likes ON users.id = likes.user_id;',
    desc: "RIGHT JOIN is like LEFT JOIN but retrieves all likes with all matching users or NULL if it doesn't have any matching user",
  },
  outer: {
    query:
      'SELECT users.name, likes.like FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id\nUNION\nSELECT users.name, likes.like FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id',
    desc: "OUTER JOIN or OUTER LEFT and RIGHT with UNION (MySQL doesn't support FULL OUTER JOIN) retrieves all users and likes, matches them, and sets NULL on any like without a match on user, and vice versa with any user that has no matching like",
  },
  leftanti: {
    query:
      'SELECT users.name FROM users LEFT JOIN likes ON users.id = likes.user_id WHERE likes.user_id IS NULL;',
    desc: 'LEFT ANTI JOIN finds users that have NO matching likes. It uses LEFT JOIN with a WHERE IS NULL clause to filter out all matches, keeping only the unmatched rows from the left table (users with no likes)',
  },
}

function JoinsApp() {
  const [currentJoin, setCurrentJoin] = useState<JoinType>('inner')
  const [showDesc, setShowDesc] = useState(false)

  const currentJoinClass = (join: JoinType) =>
    `button-reset join ${currentJoin === join ? ' current-join' : ''}`

  const selectJoin = (join: JoinType) => {
    setCurrentJoin(join)
    setShowDesc(false)
  }

  return (
    <>
      {/* Header */}
      <div className="header">
        <h1>Visual JOIN</h1>
        <span>
          Understand how joins work by interacting and see it visually
        </span>
      </div>

      <div className="content">
        {/* Joins */}
        <div className="joins">
          <button
            type="button"
            className={currentJoinClass('inner')}
            onClick={() => selectJoin('inner')}
          >
            <h2>INNER JOIN</h2>
            <div className="subtitle">(or JOIN)</div>
            <InnerJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('left')}
            onClick={() => selectJoin('left')}
          >
            <h2>LEFT JOIN</h2>
            <div className="subtitle">&nbsp;</div>
            <LeftJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('leftanti')}
            onClick={() => selectJoin('leftanti')}
          >
            <h2>LEFT ANTI JOIN</h2>
            <div className="subtitle">(with WHERE IS NULL)</div>
            <LeftAntiJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('right')}
            onClick={() => selectJoin('right')}
          >
            <h2>RIGHT JOIN</h2>
            <div className="subtitle">&nbsp;</div>
            <RightJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('outer')}
            onClick={() => selectJoin('outer')}
          >
            <h2>OUTER JOIN</h2>
            <div className="subtitle">(with UNION)</div>
            <OuterJoinSVG />
          </button>
        </div>

        {/* SQL Query and Description */}
        <div className="sql-container">
          <div className="sql">{sqlInfo[currentJoin].query}</div>
          <button
            type="button"
            className="show-desc"
            onClick={() => setShowDesc(!showDesc)}
          >
            {showDesc ? 'Hide description »' : 'Description »'}
          </button>
          {showDesc && <div className="desc">{sqlInfo[currentJoin].desc}</div>}
        </div>

        {/* Tables */}
        <Tables currentJoin={currentJoin} />
      </div>

      {/* Footer */}
      <div className="footer">
        <span>
          &copy; 2025 <a href="http://spathon.com">Spathon</a>
        </span>
        <a href="https://github.com/spathon/Visual-JOIN">Github</a>
      </div>
    </>
  )
}

export default JoinsApp
