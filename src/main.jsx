import { createRoot } from 'react-dom/client';
import JoinsApp from './JoinsApp';
import './styles.css'; // Assuming you have a CSS file for styles

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<JoinsApp />);
