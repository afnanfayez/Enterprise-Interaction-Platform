import { getCountryNameAr } from './countries-i18n';
import { getCurrencyNameAr } from './currencies-ar';
import { getCityAr } from './cities-ar';

export interface Country {
  iso2: string;
  nameEn: string;
  nameAr: string;
  flag: string;
  currency: string;
  currencyNameAr: string;
}

export interface City {
  nameEn: string;
  nameAr: string;
}

interface FlagEntry {
  name: string;
  flag: string;
  iso2: string;
}

interface CurrencyEntry {
  name: string;
  currency: string;
}

interface OverpassElement {
  tags?: {
    name?: string;
    'name:ar'?: string;
    'name:en'?: string;
    place?: string;
    population?: string;
  };
}


const isArabicScript = (s: string) => /[\u0600-\u06FF]/.test(s);

export async function fetchCountries(): Promise<Country[]> {
  const [flagsRes, currencyRes] = await Promise.all([
    fetch('https://countriesnow.space/api/v0.1/countries/flag/images'),
    fetch('https://countriesnow.space/api/v0.1/countries/currency'),
  ]);

  const [flagsData, currencyData] = await Promise.all([
    flagsRes.json(),
    currencyRes.json(),
  ]);

  const currencyMap: Record<string, string> = {};
  for (const entry of (currencyData?.data ?? []) as CurrencyEntry[]) {
    currencyMap[entry.name] = entry.currency;
  }

  const countries: Country[] = ((flagsData?.data ?? []) as FlagEntry[]).map(
    (f) => {
      const currencyCode = currencyMap[f.name] ?? '';
      return {
        iso2: f.iso2,
        nameEn: f.name,
        nameAr: getCountryNameAr(f.iso2) || f.name,
        flag: f.flag,
        currency: currencyCode,
        currencyNameAr: getCurrencyNameAr(currencyCode),
      };
    }
  );

  return countries.sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));
}

async function fetchCitiesFromOverpass(iso2: string): Promise<City[]> {
  const query = `
    [out:json][timeout:45];
    area["ISO3166-1:alpha2"="${iso2.toUpperCase()}"]->.country;
    (
      node["place"~"^(city|town)$"]["name"](area.country);
    );
    out tags qt 300;
  `;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);

  const data = await res.json();
  const elements: OverpassElement[] = data?.elements ?? [];

  type RichCity = City & { population: number };

  const cities: RichCity[] = elements
    .map((el): RichCity => {
      const tagAr = el.tags?.['name:ar'] ?? '';
      const tagDefault = el.tags?.name ?? '';
      const tagEn = el.tags?.['name:en'] ?? '';

      let nameAr = '';
      let nameEn = '';

      if (tagAr) {
        nameAr = tagAr;
        nameEn = tagEn || (isArabicScript(tagDefault) ? '' : tagDefault);
      } else if (isArabicScript(tagDefault)) {
        nameAr = tagDefault;
        nameEn = tagEn;
      }

      return {
        nameAr,
        nameEn,
        population: parseInt(el.tags?.population ?? '0', 10),
      };
    })
    .filter((c) => c.nameAr.length > 0);

  cities.sort((a, b) => b.population - a.population);

  const seen = new Set<string>();
  return cities.filter((c) => {
    if (seen.has(c.nameAr)) return false;
    seen.add(c.nameAr);
    return true;
  });
}


async function fetchCitiesFromCountriesNow(
  countryNameEn: string,
  iso2: string
): Promise<City[]> {
  const res = await fetch(
    'https://countriesnow.space/api/v0.1/countries/cities',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: countryNameEn }),
    }
  );
  const data = await res.json();
  const cities = (data?.data ?? []) as string[];
  return cities.map((city) => ({
    nameEn: city,
    nameAr: getCityAr(iso2, city),
  }));
}

export async function fetchCities(
  countryNameEn: string,
  iso2: string
): Promise<City[]> {
  try {
    const cities = await fetchCitiesFromOverpass(iso2);
    if (cities.length >= 3) return cities;
    throw new Error(`Too few results from Overpass (${cities.length})`);
  } catch (err) {
    console.warn('[fetchCities] Overpass fallback →', err);
    return fetchCitiesFromCountriesNow(countryNameEn, iso2);
  }
}
