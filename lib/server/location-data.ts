import 'server-only';

import { createRequire } from 'node:module';
import { getCitiesArByCountry } from '@/lib/cities-ar';
import { getCountryNameAr } from '@/lib/countries-i18n';
import { getCurrencyNameAr } from '@/lib/currencies-ar';
import type { City, Country } from '@/lib/location-types';

interface CountryDatasetEntry {
  iso2: string;
  name: string;
  currency?: string;
  emoji?: string;
}

type CountriesLib = {
  getCountries: () => Promise<CountryDatasetEntry[]>;
};

const require = createRequire(import.meta.url);
const countriesLib = require('@countrystatecity/countries') as CountriesLib;

const ARAB_COUNTRY_CODES = new Set([
  'AE',
  'BH',
  'DJ',
  'DZ',
  'EG',
  'IQ',
  'JO',
  'KM',
  'KW',
  'LB',
  'LY',
  'MA',
  'MR',
  'OM',
  'PS',
  'QA',
  'SA',
  'SD',
  'SO',
  'SY',
  'TN',
  'YE',
]);

const isValidIso2 = (value: string): boolean => /^[A-Za-z]{2}$/.test(value);

let countriesCache: Country[] | null = null;
const citiesCache = new Map<string, City[]>();

export async function getArabCountries(): Promise<Country[]> {
  if (countriesCache) return countriesCache;

  const countriesData = await countriesLib.getCountries();

  const countries: Country[] = countriesData
    .filter((country) => ARAB_COUNTRY_CODES.has(country.iso2))
    .map((country) => {
      const currencyCode = country.currency ?? '';

      return {
        iso2: country.iso2,
        nameEn: country.name,
        nameAr: getCountryNameAr(country.iso2) || country.name,
        flag: country.emoji ?? '',
        currency: currencyCode,
        currencyNameAr: getCurrencyNameAr(currencyCode),
      };
    });

  countriesCache = countries.sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));
  return countriesCache;
}

export async function getCitiesByCountryIso2(iso2: string): Promise<City[]> {
  if (!isValidIso2(iso2)) {
    throw new Error('Invalid iso2');
  }

  const normalizedIso2 = iso2.toUpperCase();
  const cached = citiesCache.get(normalizedIso2);
  if (cached) return cached;

  const cities: City[] = getCitiesArByCountry(normalizedIso2);
  citiesCache.set(normalizedIso2, cities);
  return cities;
}
