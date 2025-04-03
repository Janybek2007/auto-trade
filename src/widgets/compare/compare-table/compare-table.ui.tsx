import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';

interface CompareTableProps {
   titleKey: string;
   data: {
      labelKey: string;
      values: string[];
   }[];
   showContact?: boolean;
}

export const CompareTable: React.FC<CompareTableProps> = ({ titleKey, data, showContact = false }) => {
   const { t } = useLanguages();

   return (
      <div className={s.specs_section}>
         <h2>{t.get(`compare.${titleKey}`)}</h2>
         <div className={s.spec_table}>
            <table>
               <tbody>
                  {data.map((row, rowIndex) => (
                     <tr key={`row-${rowIndex}`}>
                        <td>{t.get(`compare.${row.labelKey}`)}</td>
                        {row.values.map((value, colIndex) => (
                           <td key={`value-${colIndex}`}>{value}</td>
                        ))}
                     </tr>
                  ))}
                  {showContact && (
                     <tr className={s.contact}>
                        <td></td>
                        {data[0].values.map((_, idx) => (
                           <td key={`contact-${idx}`}>
                              <button className={s['contact-btn']}>
                                 <img src={'/icons/det-icon3.svg'} alt={''} />
                                 <p>{t.get('compare.contactManager')}</p>
                              </button>
                           </td>
                        ))}
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};
