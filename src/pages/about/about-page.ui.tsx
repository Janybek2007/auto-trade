import { AboutInfo } from '@widgets/about-info';
import { Contact } from '@widgets/contact';
import { WhyUs } from '@widgets/why-us';
import React from 'react';

export const AboutPage: React.FC = async () => {
  
   return (
      <>
         <AboutInfo />
         <WhyUs />
         <Contact /> 
      </>
   );
};
