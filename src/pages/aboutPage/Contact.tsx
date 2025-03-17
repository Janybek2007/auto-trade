import s from './style/Contact.module.scss';
import logo1 from '../../../public/icons/con-logo1.svg';
import logo2 from '../../../public/icons/con-logo2.svg';
import logo3 from '../../../public/icons/con-logo3.svg';

export const Contact = () => {
   const blockData1 = {
      icon: logo1,
      title: 'Адрес',
      li1: 'г. Бишкек​, EURASIA ​Киевская улица, офис; 4 этаж',
      li2: 'г. Ош, EURASIA ​Киевская улица, офис; 4 этаж',
   };

   const blockData2 = {
      icon: logo2,
      title: 'Номер телефона',
      li1: '+996 995-20-08-92',
      li2: '+996 700-90-00-82',
      li3: '+996 508-00-00-01',
   };

   const blockData3 = {
      icon: logo3,
      title: 'Наши социальные сети',
      li1: '@askar_auto_america',
      li2: '@askar_korea',
      li3: '@jylas_tuning',
   };

   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <h1>Контакты</h1>

               <div className={s.main_block}>
                  {/* block 1 */}
                  <div className={s.block1}>
                     <div className={s.icons}>
                        <img src={blockData1.icon} alt='' />
                        <h3>{blockData1.title}</h3>
                     </div>

                     <div className={s.links}>
                        <p>{blockData1.li1}</p>
                        <p>{blockData1.li2}</p>
                     </div>
                  </div>
                  {/* block 1 */}

                  {/* block 2 */}
                  <div className={s.block2}>
                     <div className={s.icons}>
                        <img src={blockData2.icon} alt='' />
                        <h3>{blockData2.title}</h3>
                     </div>

                     <div className={s.links}>
                        <p>{blockData2.li1}</p>
                        <p>{blockData2.li2}</p>
                        <p>{blockData2.li3}</p>
                     </div>
                  </div>
                  {/* block 2 */}

                  {/* block 3 */}
                  <div className={s.block3}>
                     <div className={s.icons}>
                        <img src={blockData3.icon} alt='' />
                        <h3>{blockData3.title}</h3>
                     </div>

                     <div className={s.links}>
                        <p>{blockData3.li1}</p>
                        <p>{blockData3.li2}</p>
                        <p>{blockData3.li3}</p>
                     </div>
                  </div>
                  {/* block 3 */}
               </div>

               <div className={s.feedback_map}>
                  <iframe
                     src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4231.239096656433!2d74.61072637869346!3d42.85533974455584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skg!4v1742212649255!5m2!1sen!2skg'
                     width={600}
                     height={450}
                     style={{ border: 0 }}
                     allowFullScreen
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'
                  />
               </div>
            </div>
         </div>
      </section>
   );
};
