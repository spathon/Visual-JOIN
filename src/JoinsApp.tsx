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
import { useTheme } from './theme'
import type { JoinType } from './types'

function SunIcon() {
  return (
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
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MonitorIcon() {
  return (
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
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function ThemeToggle() {
  const { t } = useI18n()
  const { theme, cycleTheme } = useTheme()

  const icon =
    theme === 'light' ? (
      <SunIcon />
    ) : theme === 'dark' ? (
      <MoonIcon />
    ) : (
      <MonitorIcon />
    )

  return (
    <button
      type="button"
      className="button-reset theme-toggle"
      onClick={cycleTheme}
      aria-label={t.toggleTheme}
    >
      {icon}
    </button>
  )
}

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
      {/* Header Controls */}
      <div className="header-controls">
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
        <ThemeToggle />
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
