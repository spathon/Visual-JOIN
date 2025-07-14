import { hydrate, prerender as ssr } from 'preact-iso'
import JoinsApp from './JoinsApp'

if (typeof window !== 'undefined') {
  const $root = document.getElementById('root')
  if (!$root) throw new Error('Root element not found')
  hydrate(<JoinsApp />, $root)
}

export async function prerender(data: object) {
  return await ssr(<JoinsApp {...data} />)
}
