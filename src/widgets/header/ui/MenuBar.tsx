import React from 'react';
import s from '../styles.module.scss';
import { motion } from 'framer-motion';
import { Icon } from '@shared/components';
import { NavLinks } from './nav-links.ui';
import { Link } from '@tanstack/react-router';

interface IProps {
   onClose: VoidFunction;
}

export const MenuBar: React.FC<IProps> = ({ onClose }) => {
   return (
      <motion.div
         initial={{ opacity: 0, x: -25 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: -25 }}
         transition={{ type: 'tween', stiffness: 100, damping: 20 }}
         className={s.menubar}
      >
         <div className={s.body}>
            <div className={s.row}>
               <figure className={s.jylas_logo}>
                  <img src={'/icons/Askar-logo.svg'} alt='' />
               </figure>
               <button onClick={onClose} className={`flexCenter ${s.closeButton}`}>
                  <Icon name='lucide:x' />
               </button>
            </div>
            <div className={s.content}>
               <hr className={s.divider} />
               <figure className={s.jylas_tuning}>
                  <img src={'/image/jylas-tuning.svg'} alt='' />
               </figure>
               <hr className={s.divider} />
               <NavLinks direction='col' />
               <hr className={s.divider} />
               <div className={s.links}>
                  <Link to='/'>Главная</Link>
                  <hr className={s.divider} />
                  <Link to='/about'>О нас</Link>
                  <hr className={s.divider} />
                  <Link to='/policy'>Политика конфиденциальности</Link>
               </div>
            </div>
         </div>
      </motion.div>
   );
};
