import { CarItem, Icon } from '@shared/components';
import { useNavigate } from '@tanstack/react-router';
import s from './styles.module.scss';
import { CarDto } from '@shared/api/cars';

interface CompareCarListProps {
   onRemove: (id: number) => void;
   cars: CarDto[];
}

export const CompareCarList: React.FC<CompareCarListProps> = ({ onRemove, cars }) => {
   const navigate = useNavigate();

   return (
      <div className={s.compareCarList}>
         {cars.map((car, i) => {
            // image: '/image/askar-img.svg',
            return (
               <CarItem
                  key={i}
                  item={car}
                  extraComponents={
                     <button className={`${s.remove} flexCenter`} onClick={() => onRemove(car.id)}>
                        <Icon name='lucide:x' />
                     </button>
                  }
                  type={'card'}
                  actions={[
                     {
                        type: 'more',
                        button: { onClick: () => navigate({ to: `/cars/${car.id}` }) },
                     },
                  ]}
               />
            );
         })}
      </div>
   );
};
