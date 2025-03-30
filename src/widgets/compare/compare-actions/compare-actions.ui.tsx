import { Icon } from '@shared/components';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl'

interface CompareActionsProps {
   onAdd: () => void;
   onRemoveAll: () => void;
}

export const CompareActions: React.FC<CompareActionsProps> = ({ onAdd, onRemoveAll }) => {
   const { t } = useLanguages();

   return (
      <div className={s.compareActions}>
         <button className={s.add} onClick={onAdd}>
            {t.get('compare.addCar')}
         </button>
         <button className={s.rmall} onClick={onRemoveAll}>
            <Icon name='lucide:x' /> {t.get('compare.removeAll')}
         </button>
      </div>
   );
};
