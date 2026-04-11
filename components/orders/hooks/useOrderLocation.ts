'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchCountries, fetchCities, type City, type Country } from '@/lib/api';
import type { Locale } from '@/lib/i18n';
import type { DropdownOption } from '@/components/address-form/Dropdown';

interface UseOrderLocationOptions {
  locale: Locale;
  onError?: (message: string) => void;
}

interface UseOrderLocationReturn {
  countryOptions: DropdownOption[];
  cityOptions: DropdownOption[];
  selectedCountry: DropdownOption | null;
  selectedCity: DropdownOption | null;
  selectedCountryMeta: Country | null;
  currencyDisplay: string | null;
  loadingCountries: boolean;
  loadingCities: boolean;
  handleCountrySelect: (option: DropdownOption) => void;
  handleCitySelect: (option: DropdownOption) => void;
}

export function useOrderLocation({ locale, onError }: UseOrderLocationOptions): UseOrderLocationReturn {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [selectedCountryIso2, setSelectedCountryIso2] = useState<string | null>(null);
  const [selectedCityNameEn, setSelectedCityNameEn] = useState<string | null>(null);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const cityRequestIdRef = useRef(0);

  const collator = useMemo(() => new Intl.Collator(locale), [locale]);

  const countryOptions = useMemo(() => {
    const options = allCountries.map((c) => ({
      value: c.iso2,
      label: locale === 'ar' ? c.nameAr : c.nameEn,
      flag: c.flag,
    }));
    options.sort((a, b) => collator.compare(a.label, b.label));
    return options;
  }, [allCountries, collator, locale]);

  const cityOptions = useMemo(() => {
    const options = citiesData.map((c) => ({
      value: c.nameEn,
      label: locale === 'ar' ? c.nameAr : c.nameEn,
    }));
    options.sort((a, b) => collator.compare(a.label, b.label));
    return options;
  }, [citiesData, collator, locale]);

  const selectedCountryMeta = useMemo(
    () => (selectedCountryIso2 ? allCountries.find((c) => c.iso2 === selectedCountryIso2) ?? null : null),
    [allCountries, selectedCountryIso2],
  );

  const selectedCountry = useMemo(
    () => (selectedCountryIso2 ? countryOptions.find((o) => o.value === selectedCountryIso2) ?? null : null),
    [countryOptions, selectedCountryIso2],
  );

  const selectedCity = useMemo(
    () => (selectedCityNameEn ? cityOptions.find((o) => o.value === selectedCityNameEn) ?? null : null),
    [cityOptions, selectedCityNameEn],
  );

  const currencyDisplay = useMemo(() => {
    if (!selectedCountryMeta) return null;
    return locale === 'ar'
      ? selectedCountryMeta.currencyNameAr || selectedCountryMeta.currency || null
      : selectedCountryMeta.currency || null;
  }, [selectedCountryMeta, locale]);

  // Fetch countries on mount
  useEffect(() => {
    let active = true;
    fetchCountries()
      .then((countries) => { if (active) setAllCountries(countries); })
      .catch(() => { if (active) onError?.('Failed to load countries'); })
      .finally(() => { if (active) setLoadingCountries(false); });
    return () => { active = false; };
  }, [onError]);

  const handleCountrySelect = (option: DropdownOption) => {
    const requestId = ++cityRequestIdRef.current;
    const meta = allCountries.find((c) => c.iso2 === option.value) ?? null;

    setSelectedCountryIso2(option.value);
    setSelectedCityNameEn(null);
    setCitiesData([]);

    if (!meta) return;

    setLoadingCities(true);
    fetchCities(meta.nameEn, meta.iso2)
      .then((cities) => { if (cityRequestIdRef.current === requestId) setCitiesData(cities); })
      .catch(() => { if (cityRequestIdRef.current === requestId) onError?.('Failed to load cities'); })
      .finally(() => { if (cityRequestIdRef.current === requestId) setLoadingCities(false); });
  };

  const handleCitySelect = (option: DropdownOption) => {
    setSelectedCityNameEn(option.value);
  };

  return {
    countryOptions,
    cityOptions,
    selectedCountry,
    selectedCity,
    selectedCountryMeta,
    currencyDisplay,
    loadingCountries,
    loadingCities,
    handleCountrySelect,
    handleCitySelect,
  };
}
