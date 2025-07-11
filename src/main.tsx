import { createRoot } from 'react-dom/client'
import JoinsApp from './JoinsApp'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container not found')
}
const root = createRoot(container)
root.render(<JoinsApp />)
