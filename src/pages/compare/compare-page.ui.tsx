import s from './style.module.scss';

interface CarTechSpec {
   id: number;
   engine: string;
   power: string;
   gearbox: string;
   wheelDrive: string;
   steeringWheel: string;
   range: string;
}

export const ComparePage: React.FC = () => {
   const carsTechSpec: CarTechSpec[] = [
      {
         id: 1,
         engine: 'Бензин, 2.5',
         power: '320 л.с',
         gearbox: 'Механика',
         wheelDrive: 'Задний',
         steeringWheel: 'Справа',
         range: '25 000 км',
      },
      {
         id: 2,
         engine: 'Бензин, 2.5',
         power: '310 л.с',
         gearbox: 'Механика',
         wheelDrive: 'Задний',
         steeringWheel: 'Справа',
         range: '25 000 км',
      },
      {
         id: 3,
         engine: 'Бензин, 2.5',
         power: '320 л.с',
         gearbox: 'Механика',
         wheelDrive: 'Задний',
         steeringWheel: 'Справа',
         range: '25 000 км',
      },
   ];

   const techLabels: { key: keyof CarTechSpec; label: string }[] = [
      { key: 'engine', label: 'Объем двигателя' },
      { key: 'power', label: 'Мощность' },
      { key: 'gearbox', label: 'Тип КПП' },
      { key: 'wheelDrive', label: 'Привод' },
      { key: 'steeringWheel', label: 'Руль' },
      { key: 'range', label: 'Пробег' },
   ];

   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <div className={s.cards_for_compare}>
                  <h1>Сравнение авто</h1>
               </div>

               <div className={s.tech_specs}>
                  <h1>Технические характеристики</h1>
                  <table className={s.table}>
                     <tbody>
                        {techLabels.map(({ key, label }) => (
                           <tr key={key}>
                              <td>
                                 {' '}
                                 <p>{label}</p>{' '}
                              </td>
                              {carsTechSpec.map(car => (
                                 <td key={car.id}>
                                    {' '}
                                    <span>{car[key]}</span>{' '}
                                 </td>
                              ))}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
   );
};
