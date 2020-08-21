import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import xhr from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

const options: i18n.InitOptions = {
    load: 'languageOnly',
    ns: ['global'],
    fallbackLng: 'en',
    defaultNS: 'global',
    backend: {
        loadPath: 'public/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
        escapeValue: false,
    },
    react: {
        bindI18n: 'languageChanged',
    },
}

export default i18n.use(LanguageDetector).use(xhr).use(initReactI18next).init(options)
