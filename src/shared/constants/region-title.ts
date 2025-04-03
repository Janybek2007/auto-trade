export const regionaleTitle = (currentLanguage: string) => ({
   korea: currentLanguage === 'RU' || currentLanguage === 'KG' ? 'Корея' : 'Korea',
   dubai: currentLanguage === 'RU' || currentLanguage === 'KG' ? 'Дубай' : 'Dubai',
   america: currentLanguage === 'RU' || currentLanguage === 'KG' ? 'Америка' : 'America',
});
