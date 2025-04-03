import s from './styles.module.scss';
import detIcon1 from '../../../public/icons/det-icon1.svg';
import detIcon2 from '../../../public/icons/det-icon2.svg';
import detIcon3 from '../../../public/icons/det-icon3.svg';
import { useLanguages } from '@shared/libs/intl';
import { useQuery } from '@tanstack/react-query';
import { CarsService } from '@shared/api/cars';
import { useParams, useSearch } from '@tanstack/react-router';
import { Loading } from '@shared/components';
import React from 'react';

export const CarDetailPage = () => {
   const { by } = useSearch({ from: '/_guest-layout/cars/$car-id' });
   const params = useParams({ from: '/_guest-layout/cars/$car-id' });
   const { data: detail, isLoading } = useQuery(
      CarsService.carsByIdQuery({ country: by, id: Number(params['car-id']) }),
   );
   const { t } = useLanguages();
   const [selectedImage, setSelectedImage] = React.useState('');
   React.useEffect(() => {
      if (detail?.photos && detail.photos.length > 0) {
         setSelectedImage(detail.photos[0].image);
      }
   }, [detail]);

   const data = {
      title: `${detail?.brand.name} ${detail?.model.name}`,
      price: `${detail?.start_price} - ${detail?.end_price}`,
      engine: `${detail?.fuel_type}, ${detail?.engine_volume}${t.get('carDetail.literUnit')}`,
      power: `${detail?.power} ${t.get('carDetail.powerUnit')}`,
      gearbox: detail?.transmission_type,
      wheelDrive: t.get('carDetail.notSpecified'),
      steeringWheel: detail?.interior.steering_wheel,
      range: `${detail?.mileage} ${t.get('carDetail.kmUnit')}`,
   };

   const data2 = {
      ext: detail?.configuration || t.get('carDetail.notSpecified'),
      int: `${detail?.interior.seat_material} ${t.get('carDetail.interiorSalon')}`,
      secure: t.get('carDetail.notSpecified'),
   };

   if (isLoading) {
      return <Loading />;
   }

   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <div className={s.top}>
                  <div className={s.left}>
                     <div className={s.mainImage}>
                        {selectedImage ? (
                           <img src={selectedImage} alt={t.get('carDetail.selectedImageAlt')} />
                        ) : (
                           <p>{t.get('carDetail.noImageAvailable')}</p>
                        )}
                     </div>
                     <div className={s.thumbnailContainer}>
                        {detail?.photos?.map((photo, index) => (
                           <img
                              key={index}
                              src={photo.image}
                              alt={`Thumbnail Image ${index}`}
                              className={selectedImage === photo.image ? s.active : ''}
                              onClick={() => setSelectedImage(photo.image)}
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
                           <h1>{t.get('carDetail.specsTitle')}</h1>
                           <div className={s.specs_boxes}>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.engineLabel')}</span>
                                 <p>{data.engine}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.powerLabel')}</span>
                                 <p>{data.power}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.gearboxLabel')}</span>
                                 <p>{data.gearbox}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.wheelDriveLabel')}</span>
                                 <p>{data.wheelDrive}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.steeringWheelLabel')}</span>
                                 <p>{data.steeringWheel}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.rangeLabel')}</span>
                                 <p>{data.range}</p>
                              </div>
                           </div>
                        </div>
                        <div className={s.block3}>
                           <h1>{t.get('carDetail.equipmentTitle')}</h1>
                           <div className={s.comp_boxes}>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.exteriorLabel')}</span>
                                 <p>{data2.ext}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.interiorLabel')}</span>
                                 <p>{data2.int}</p>
                              </div>
                              <div className={s.box}>
                                 <span>{t.get('carDetail.securityLabel')}</span>
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
                           <img src={detIcon1} alt='' />
                           <p>{t.get('carDetail.deliveryTime')}</p>
                        </div>
                        <div className={s.box}>
                           <img src={detIcon2} alt='' />
                           <p>{t.get('carDetail.deliveryCost')}</p>
                        </div>
                     </div>
                     <div className={s.right}>
                        <button className={s.box}>
                           <img src={detIcon3} alt={t.get('carDetail.whatsappAlt')} />
                           <p>{t.get('carDetail.contactManager')}</p>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
