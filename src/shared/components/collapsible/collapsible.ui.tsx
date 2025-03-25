'use client';

import styles from './styles.module.scss';
import React from 'react';
import { CollapsibleProps } from './collapsible.types';
import { AnimatePresence, motion } from 'framer-motion';

const Collapsible: React.FC<CollapsibleProps> = ({ disabled, className, children, trigger, value }) => {
   return (
      <div suppressHydrationWarning className={`${className} ${styles.collapsible}`}>
         {trigger && trigger}

         <AnimatePresence>
            {!disabled && value && (
               <>
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className={`${styles.collapsible_content} collabsible_content`}
                  >
                     {children}
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Collapsible;
