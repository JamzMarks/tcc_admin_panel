import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'en-GB', 'pt-BR'],
  defaultLocale: 'en',
//   localePrefix: {
//     mode: 'always',
//     prefixes: {
//       'en-US': '/us',
//       'en-GB': '/uk'
//     }
//   },
//   pathnames: {
//     '/': '/',
//     '/organization': {
//       'en-US': '/organization',
//       'en-GB': '/organisation'
//     }
//   }
});