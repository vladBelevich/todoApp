import App from './components/app';
import { createRoot } from 'react-dom/client';

import './index.css';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<App />);
