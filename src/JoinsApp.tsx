import { useState } from 'preact/hooks'
import { SQL_QUERIES } from './constants'
import { LOCALES, type Locale, useI18n } from './i18n'
import type { Translations } from './i18n/types'
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
 * Get the description for a join type from translations
 */
function getJoinDescription(t: Translations, join: JoinType): string {
  const descriptionMap: Record<JoinType, keyof Translations> = {
    inner: 'innerJoinDesc',
    left: 'leftJoinDesc',
    leftanti: 'leftAntiJoinDesc',
    right: 'rightJoinDesc',
    outer: 'outerJoinDesc',
  }
  return t[descriptionMap[join]]
}

/**
 * Main application component for Visual JOIN
 * Allows users to select different join types and see the results visually
 */
function JoinsApp() {
  const { t, locale, setLocale } = useI18n()
  const [currentJoin, setCurrentJoin] = useState<JoinType>('inner')
  const [showDesc, setShowDesc] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)

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
  }

  return (
    <>
      {/* Language Switcher */}
      <div className="language-switcher">
        <button
          type="button"
          className="button-reset language-toggle"
          onClick={() => setShowLangMenu(!showLangMenu)}
          aria-label={t.language}
          aria-expanded={showLangMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </button>
        {showLangMenu && (
          <ul className="language-menu">
            {Object.entries(LOCALES).map(([code, name]) => (
              <li key={code}>
                <button
                  type="button"
                  className={`button-reset language-option ${locale === code ? 'is-active' : ''}`}
                  onClick={() => {
                    setLocale(code as Locale)
                    setShowLangMenu(false)
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Header */}
      <div className="header">
        <h1>{t.title}</h1>
        <span>{t.subtitle}</span>
      </div>

      <div className="content">
        {/* Joins */}
        <div className="joins">
          <button
            type="button"
            className={currentJoinClass('inner')}
            onClick={() => selectJoin('inner')}
          >
            <h2>{t.innerJoin}</h2>
            <div className="subtitle">{t.orJoin}</div>
            <InnerJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('left')}
            onClick={() => selectJoin('left')}
          >
            <h2>{t.leftJoin}</h2>
            <div className="subtitle">&nbsp;</div>
            <LeftJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('leftanti')}
            onClick={() => selectJoin('leftanti')}
          >
            <h2>{t.leftAntiJoin}</h2>
            <div className="subtitle">{t.withWhereIsNull}</div>
            <LeftAntiJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('right')}
            onClick={() => selectJoin('right')}
          >
            <h2>{t.rightJoin}</h2>
            <div className="subtitle">&nbsp;</div>
            <RightJoinSVG />
          </button>
          <button
            type="button"
            className={currentJoinClass('outer')}
            onClick={() => selectJoin('outer')}
          >
            <h2>{t.outerJoin}</h2>
            <div className="subtitle">{t.withUnion}</div>
            <OuterJoinSVG />
          </button>
        </div>

        {/* SQL Query and Description */}
        <div className="sql-container">
          <div className="sql">{SQL_QUERIES[currentJoin]}</div>
          <button
            type="button"
            className="show-desc"
            onClick={() => setShowDesc(!showDesc)}
          >
            {showDesc ? `${t.hideDescription} »` : `${t.description} »`}
          </button>
          {showDesc && (
            <div className="desc">{getJoinDescription(t, currentJoin)}</div>
          )}
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
