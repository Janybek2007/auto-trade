import { Provider } from './providers';
import ReactDOM from 'react-dom/client';
import './styles/reset.scss';
import './styles/variables.scss';
import './styles/global.scss';
import { Card_item, List_item } from '@shared/components/car-item';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <>
      <Provider />
      {/* <Card_item actions={[{ type: 'Подробнее' }, { type: 'Сравнение', button: { icon: { name: '' } } }]} />
      <List_item actions={[{ type: 'Подробнее' }, { type: 'Сравнение', button: { icon: { name: '' } } }]} /> */}
   </>,
);
