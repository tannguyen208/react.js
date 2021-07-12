import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import {__DEV__} from 'src/utils/isEnv'

const lookupKey = 'i18n'
const lookupValue = 'en'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: lookupValue,
    detection: {
      lookupCookie: lookupKey,
      lookupLocalStorage: lookupKey,
      lookupSessionStorage: lookupKey,
    },
    react: {
      useSuspense: false,
    },
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
