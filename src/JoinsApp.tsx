import { useState } from 'preact/hooks'
import { SQL_INFO } from './constants'
import {
  InnerJoinSVG,
  LeftAntiJoinSVG,
  LeftJoinSVG,
  OuterJoinSVG,
  RightJoinSVG,
} from './JoinSVG'
import Tables from './Tables'
import type { JoinType } from './types'

/**
 * Main application component for Visual JOIN
 * Allows users to select different join types and see the results visually
 */
function JoinsApp() {
  const [currentJoin, setCurrentJoin] = useState<JoinType>('inner')
  const [showDesc, setShowDesc] = useState(false)

  /**
   * Generates className for join buttons with active state
   */
  const currentJoinClass = (join: JoinType) => {
    const baseClass = 'button-reset join'
    const activeClass = currentJoin === join ? 'current-join' : ''
    return `${baseClass} ${activeClass}`.trim()
  }

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
          <div className="sql">{SQL_INFO[currentJoin].query}</div>
          <button
            type="button"
            className="show-desc"
            onClick={() => setShowDesc(!showDesc)}
          >
            {showDesc ? 'Hide description »' : 'Description »'}
          </button>
          {showDesc && <div className="desc">{SQL_INFO[currentJoin].desc}</div>}
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
