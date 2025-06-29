import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations using ES modules
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import geTranslations from './locales/ge.json'; // Spanish (corrected from 'sp')
import spTranslations from './locales/sp.json'; // German (corrected from 'ge')

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      ge: { translation: geTranslations }, // Corrected code
      sp: { translation: spTranslations }  // Corrected code
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { 
      escapeValue: false 
    }
  });

export default i18n;
