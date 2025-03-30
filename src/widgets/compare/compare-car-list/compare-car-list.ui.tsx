import { CarItem, Icon } from '@shared/components';
import { useNavigate } from '@tanstack/react-router';
import { baseCarData } from '@widgets/filtration';
import s from './styles.module.scss';

interface CompareCarListProps {
  count: number;
  onRemove: (index: number) => void;
}

export const CompareCarList: React.FC<CompareCarListProps> = ({ count, onRemove }) => {
  const navigate = useNavigate();

  return (
    <div className={s.compareCarList}>
      {Array.from({ length: count }).map((_, i) => {
        const carData = baseCarData[i % baseCarData.length];

        return (
          <CarItem
            key={i}
            item={{
              image: '/image/askar-img.svg',
              ...carData,
            }}
            extraComponents={
              <button className={`${s.remove} flexCenter`} onClick={() => onRemove(i)}>
                <Icon name='lucide:x' />
              </button>
            }
            type={'card'}
            actions={[
              {
                type: 'more',
                button: { onClick: () => navigate({ to: `/cars/${i}` }) },
              },
            ]}
          />
        );
      })}
    </div>
  );
};
