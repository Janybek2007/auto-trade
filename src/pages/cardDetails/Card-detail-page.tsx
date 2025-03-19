import { useState } from 'react';
import s from './style/Card-detail-page.module.scss';
import image1 from '../../../public/image/detail-img1.svg';
import image2 from '../../../public/image/detail-img2.svg';
import image3 from '../../../public/image/detail-img3.svg';
import image4 from '../../../public/image/detail-img4.svg';

import detIcon1 from "../../../public/icons/det-icon1.svg"
import detIcon2 from "../../../public/icons/det-icon2.svg"
import detIcon3 from "../../../public/icons/det-icon3.svg"

export const Card_detail_page = () => {
   const images = [image1, image2, image3, image4, image1];

   const data = {
    title: 'KIA K5',
    price: '24 410',
    engine: 'Бензин, 2.5л',
    power: '294 л.с.',
    gearbox: 'Робот',
    wheelDrive: 'Передний',
    steeringWheel: 'Левый',
    range: '25 000 км, без пробега по КР',
   }

   const data2 = {
    ext: 'Скрытые дверные уплотнители, 18-19" легкосплавные диски',
    int: 'Мультимедиа 10,25” (CarPlay, Android Auto) Кожаный салон с подсветкой',
    secure: '6 подушек безопасности, Контроль слепых зон, Автоматическое торможение'
   }

   const [selectedImage, setSelectedImage] = useState(images[0]);

   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
                <div className={s.top}>
                <div className={s.left}>
                  <div className={s.mainImage}>
                     <img src={selectedImage} alt='Selected' />
                  </div>
                  <div className={s.thumbnailContainer}>
                     {images.map((img, index) => (
                        <img
                           key={index}
                           src={img}
                           alt={`Thumbnail ${index}`}
                           className={selectedImage === img ? s.active : ''}
                           onClick={() => setSelectedImage(img)}
                        />
                     ))}
                  </div>
               </div>
               <div className={s.right}>
                  <div className={s.main_content}>
                     <div className={s.block1}>
                        <h1>{data.title}</h1>
                        <h2>${data.price}</h2>
                     </div>
                     <div className={s.block2}>
                        <h1>Технические характеристики</h1>

                        <div className={s.specs_boxes}>
                            <div className={s.box}>
                                <span>Объем двигателя</span>
                                <p>{data.engine}</p>
                            </div>
                            <div className={s.box}>
                                <span>Мощность</span>
                                <p>{data.power}</p>
                            </div>
                            <div className={s.box}>
                                <span>Тип КПП</span>
                                <p>{data.gearbox}</p>
                            </div>
                            <div className={s.box}>
                                <span>Привод</span>
                                <p>{data.wheelDrive}</p>
                            </div>
                            <div className={s.box}>
                                <span>Руль</span>
                                <p>{data.steeringWheel}</p>
                            </div>
                            <div className={s.box}>
                                <span>Пробег</span>
                                <p>{data.range}</p>
                            </div>
                        </div>
                     </div>
                     <div className={s.block3}>
                        <h1>Комплектация</h1>

                        <div className={s.comp_boxes}>
                            <div className={s.box}>
                                <span>Экстерьер</span>
                                <p>{data2.ext}</p>
                            </div>
                            <div className={s.box}>
                                <span>Интерьер:</span>
                                <p>{data2.int}</p>
                            </div>
                            <div className={s.box}>
                                <span>Безопасность:</span>
                                <p>{data2.secure}</p>
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
                </div>

                <div className={s.bottom}>
                    <div className={s.bot_content}>
                        <div className={s.left}>
                            <div className={s.box}>
                                <img src={detIcon1} alt="" />
                                <p>Время доставки примерно 2,5 месяца</p>
                            </div>
                            <div className={s.box}>
                                <img src={detIcon2} alt="" />
                                <p>Цена доставки составляет $ 4000-4500 в зависимости от штатта</p>
                            </div>
                        </div>
                        <div className={s.right}>
                            <div className={s.box}>
                                <img src={detIcon3} alt="" />
                                <p>Написать менеджеру</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>
   );
};
