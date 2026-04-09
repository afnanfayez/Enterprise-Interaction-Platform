import isoCountries from 'i18n-iso-countries';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const arLocale = require('i18n-iso-countries/langs/ar.json');

isoCountries.registerLocale(arLocale);


export function getCountryNameAr(iso2: string): string {
  return isoCountries.getName(iso2.toUpperCase(), 'ar') ?? '';
}
