import { Provider } from './providers';
import ReactDOM from 'react-dom/client';
import './styles/reset.scss';
import './styles/variables.scss';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Provider />);