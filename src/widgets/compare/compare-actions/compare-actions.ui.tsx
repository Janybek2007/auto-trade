import { Icon } from '@shared/components';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';
import { Link } from '@tanstack/react-router';
import { CountryDto } from '@shared/api/cars';

interface CompareActionsProps {
   onRemoveAll: () => void;
   by: CountryDto;
}

export const CompareActions: React.FC<CompareActionsProps> = ({ onRemoveAll, by }) => {
   const { t } = useLanguages();

   return (
      <div className={s.compareActions}>
         <Link to='/filtration' search={{ by }} className={s.add}>
            {t.get('compare.addCar')}
         </Link>
         <button className={s.rmall} onClick={onRemoveAll}>
            <Icon className='flexCenter' name='lucide:x' /> {t.get('compare.removeAll')}
         </button>
      </div>
   );
};
