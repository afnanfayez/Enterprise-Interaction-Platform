import type { City, Country } from './location-types';

interface ApiSuccess<T> {
  data: T;
}

interface ApiError {
  error: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const payload = (await response.json()) as ApiSuccess<T> | ApiError;

  if (!response.ok) {
    const message =
      'error' in payload ? payload.error : `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return (payload as ApiSuccess<T>).data;
}

export async function fetchCountries(): Promise<Country[]> {
  return fetchJson<Country[]>('/api/countries');
}

export async function fetchCities(
  _countryNameEn: string,
  iso2: string
): Promise<City[]> {
  return fetchJson<City[]>(`/api/cities?iso2=${encodeURIComponent(iso2)}`);
}

export type { City, Country };
