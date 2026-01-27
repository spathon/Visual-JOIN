import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import en from './locales/en'
import { DEFAULT_LOCALE, type Locale, type Translations } from './types'

const STORAGE_KEY = 'visual-join-locale'

interface I18nContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

const I18nContext = createContext<I18nContextValue | null>(null)

/**
 * Lazy load locale translations
 * Each locale is a separate chunk loaded on demand
 */
async function loadLocale(locale: Locale): Promise<Translations> {
  switch (locale) {
    case 'es':
      return (await import('./locales/es')).default
    case 'fr':
      return (await import('./locales/fr')).default
    case 'de':
      return (await import('./locales/de')).default
    default:
      return en
  }
}

/**
 * Get saved locale from localStorage or return default
 */
function getSavedLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && ['en', 'es', 'fr', 'de'].includes(saved)) {
    return saved as Locale
  }
  return DEFAULT_LOCALE
}

/**
 * Save locale to localStorage
 */
function saveLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale)
  }
}

export function I18nProvider({ children }: { children: ComponentChildren }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [translations, setTranslations] = useState<Translations>(en)
  const [isLoading, setIsLoading] = useState(false)

  // Load saved locale on mount
  useEffect(() => {
    const savedLocale = getSavedLocale()
    if (savedLocale !== DEFAULT_LOCALE) {
      setLocaleState(savedLocale)
      setIsLoading(true)
      loadLocale(savedLocale).then((t) => {
        setTranslations(t)
        setIsLoading(false)
      })
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return

    setLocaleState(newLocale)
    saveLocale(newLocale)

    if (newLocale === DEFAULT_LOCALE) {
      setTranslations(en)
    } else {
      setIsLoading(true)
      loadLocale(newLocale).then((t) => {
        setTranslations(t)
        setIsLoading(false)
      })
    }
  }

  return (
    <I18nContext.Provider
      value={{ locale, t: translations, setLocale, isLoading }}
    >
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Hook to access translations and locale management
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
