'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchCountries, fetchCities, type City, type Country } from '@/lib/api';
import type { Locale } from '@/lib/i18n';
import type { DropdownOption } from '../Dropdown';

export interface FieldErrors {
  country?: string;
  city?: string;
}

export interface AddressFormMessages {
  countryRequired: string;
  cityRequired: string;
  countriesLoadFailed: string;
  citiesLoadFailed: string;
}

interface UseAddressFormOptions {
  locale: Locale;
  messages: AddressFormMessages;
}

export type SubmitResult =
  | { status: 'validation-error' }
  | {
      status: 'success';
      payload: {
        countryLabel: string;
        cityLabel: string;
        currencyDisplay: string | null;
      };
    };

export function useAddressForm({ locale, messages }: UseAddressFormOptions) {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [selectedCountryIso2, setSelectedCountryIso2] = useState<string | null>(null);
  const [selectedCityNameEn, setSelectedCityNameEn] = useState<string | null>(null);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState<string | null>(null);
  const cityRequestIdRef = useRef(0);

  const collator = useMemo(() => new Intl.Collator(locale), [locale]);

  const countryOptions = useMemo(() => {
    const options = allCountries.map((country) => ({
      value: country.iso2,
      label: locale === 'ar' ? country.nameAr : country.nameEn,
      flag: country.flag,
    }));

    options.sort((a, b) => collator.compare(a.label, b.label));
    return options;
  }, [allCountries, collator, locale]);

  const cityOptions = useMemo(() => {
    const options = citiesData.map((city) => ({
      value: city.nameEn,
      label: locale === 'ar' ? city.nameAr : city.nameEn,
    }));

    options.sort((a, b) => collator.compare(a.label, b.label));
    return options;
  }, [citiesData, collator, locale]);

  const selectedCountryMeta = useMemo(
    () =>
      selectedCountryIso2
        ? allCountries.find((country) => country.iso2 === selectedCountryIso2) ?? null
        : null,
    [allCountries, selectedCountryIso2]
  );

  const selectedCountry = useMemo(
    () =>
      selectedCountryIso2
        ? countryOptions.find((option) => option.value === selectedCountryIso2) ?? null
        : null,
    [countryOptions, selectedCountryIso2]
  );

  const selectedCity = useMemo(
    () =>
      selectedCityNameEn
        ? cityOptions.find((option) => option.value === selectedCityNameEn) ?? null
        : null,
    [cityOptions, selectedCityNameEn]
  );

  useEffect(() => {
    let active = true;

    fetchCountries()
      .then((countries) => {
        if (!active) return;
        setAllCountries(countries);
      })
      .catch(() => {
        if (!active) return;
        setRequestError(messages.countriesLoadFailed);
      })
      .finally(() => {
        if (!active) return;
        setLoadingCountries(false);
      });

    return () => {
      active = false;
    };
  }, [messages.countriesLoadFailed]);

  const handleCountrySelect = (option: DropdownOption) => {
    const requestId = cityRequestIdRef.current + 1;
    cityRequestIdRef.current = requestId;

    const selectedIso2 = option.value;
    const meta = allCountries.find((country) => country.iso2 === selectedIso2) ?? null;

    setSelectedCountryIso2(selectedIso2);
    setSelectedCityNameEn(null);
    setCitiesData([]);
    setRequestError(null);
    setFieldErrors((prev) => ({ ...prev, country: undefined, city: undefined }));

    if (!meta) return;

    setLoadingCities(true);
    fetchCities(meta.nameEn, meta.iso2)
      .then((cities) => {
        if (cityRequestIdRef.current !== requestId) return;
        setCitiesData(cities);
      })
      .catch(() => {
        if (cityRequestIdRef.current !== requestId) return;
        setRequestError(messages.citiesLoadFailed);
      })
      .finally(() => {
        if (cityRequestIdRef.current !== requestId) return;
        setLoadingCities(false);
      });
  };

  const handleCitySelect = (option: DropdownOption) => {
    setSelectedCityNameEn(option.value);
    setFieldErrors((prev) => ({ ...prev, city: undefined }));
    setRequestError(null);
  };

  const submit = (): SubmitResult => {
    const country = selectedCountry;
    const city = selectedCity;
    const nextErrors: FieldErrors = {};

    if (!country) nextErrors.country = messages.countryRequired;
    if (!city) nextErrors.city = messages.cityRequired;

    if (!country || !city) {
      setFieldErrors(nextErrors);
      return { status: 'validation-error' };
    }

    setFieldErrors({});

    const currencyDisplay =
      locale === 'ar'
        ? selectedCountryMeta?.currencyNameAr || selectedCountryMeta?.currency || null
        : selectedCountryMeta?.currency || null;

    return {
      status: 'success',
      payload: {
        countryLabel: country.label,
        cityLabel: city.label,
        currencyDisplay,
      },
    };
  };

  const cancel = () => {
    cityRequestIdRef.current += 1;
    setSelectedCountryIso2(null);
    setSelectedCityNameEn(null);
    setCitiesData([]);
    setFieldErrors({});
    setRequestError(null);
  };

  return {
    countryOptions,
    cityOptions,
    selectedCountry,
    selectedCity,
    selectedCountryMeta,
    loadingCountries,
    loadingCities,
    fieldErrors,
    requestError,
    handleCountrySelect,
    handleCitySelect,
    submit,
    cancel,
  };
}
