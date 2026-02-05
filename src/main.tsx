import { hydrate, prerender as ssr } from 'preact-iso'
import { I18nProvider } from './i18n'
import JoinsApp from './JoinsApp'
import { ThemeProvider } from './theme'

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <JoinsApp />
      </I18nProvider>
    </ThemeProvider>
  )
}

/**
 * Client-side hydration - attaches Preact to the pre-rendered HTML
 */
if (typeof window !== 'undefined') {
  const $root = document.getElementById('root')
  if (!$root) throw new Error('Root element not found')
  hydrate(<App />, $root)
}

/**
 * Server-side prerendering function for static site generation
 * @param data - Optional props to pass to the JoinsApp component
 * @returns Pre-rendered HTML string
 */
export async function prerender(data?: Record<string, unknown>) {
  return await ssr(<App {...data} />)
}
