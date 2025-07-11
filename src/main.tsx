import { createRoot } from 'react-dom/client';
import JoinsApp from './JoinsApp';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<JoinsApp />);
