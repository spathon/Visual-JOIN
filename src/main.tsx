import { hydrate, prerender as ssr } from 'preact-iso'
import JoinsApp from './JoinsApp'

// Self-hosted fonts with font-display: swap for optimal performance
// Using Latin subset only for English content to reduce file size
import '@fontsource/open-sans/latin-300.css'
import '@fontsource/open-sans/latin-400.css'
import '@fontsource/open-sans/latin-500.css'
import '@fontsource/open-sans/latin-600.css'

/**
 * Client-side hydration - attaches Preact to the pre-rendered HTML
 */
if (typeof window !== 'undefined') {
  const $root = document.getElementById('root')
  if (!$root) throw new Error('Root element not found')
  hydrate(<JoinsApp />, $root)
}

/**
 * Server-side prerendering function for static site generation
 * @param data - Optional props to pass to the JoinsApp component
 * @returns Pre-rendered HTML string
 */
export async function prerender(data?: Record<string, unknown>) {
  return await ssr(<JoinsApp {...data} />)
}
