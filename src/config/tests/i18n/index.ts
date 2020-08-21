import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,
    interpolation: {
        escapeValue: false,
    },

    resources: {
        en: {
            translations: {
                'switch-language': 'Přepnout do ČJ',
                profile: 'Profile',
                'about-app': 'About App',
                yes: 'Yes',
                no: 'No',
                notes: 'Notes',
                'new-note': 'New Note',
                edit: 'Edit',
                close: 'Close',
                save: 'Save',
                'delete-message': "Are you sure delete Note: '{{title}}'?",
            },
        },
    },
})

export default i18n
