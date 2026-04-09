'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchCountries, fetchCities, type Country } from '@/lib/api';
import type { DropdownOption } from '../Dropdown';

export interface FieldErrors {
  country?: string;
  city?: string;
}

export type SubmitResult =
  | { status: 'validation-error' }
  | {
      status: 'success';
      payload: {
        countryLabel: string;
        cityLabel: string;
        currencyNameAr: string | null;
      };
    };

export function useAddressForm() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [cityOptions, setCityOptions] = useState<DropdownOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<DropdownOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<DropdownOption | null>(null);
  const [selectedCountryMeta, setSelectedCountryMeta] = useState<Country | null>(null);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState<string | null>(null);
  const cityRequestIdRef = useRef(0);

  const countryOptions = useMemo(
    () =>
      allCountries.map((country) => ({
        value: country.iso2,
        label: country.nameAr,
        flag: country.flag,
      })),
    [allCountries]
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
        setRequestError('تعذر تحميل قائمة الدول. يرجى المحاولة مرة أخرى.');
      })
      .finally(() => {
        if (!active) return;
        setLoadingCountries(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleCountrySelect = (option: DropdownOption) => {
    const requestId = cityRequestIdRef.current + 1;
    cityRequestIdRef.current = requestId;

    const meta = allCountries.find((country) => country.iso2 === option.value) ?? null;

    setSelectedCountry(option);
    setSelectedCountryMeta(meta);
    setSelectedCity(null);
    setCityOptions([]);
    setRequestError(null);
    setFieldErrors((prev) => ({ ...prev, country: undefined, city: undefined }));

    if (!meta) return;

    setLoadingCities(true);
    fetchCities(meta.nameEn, meta.iso2)
      .then((cities) => {
        if (cityRequestIdRef.current !== requestId) return;
        setCityOptions(
          cities.map((city) => ({
            value: city.nameEn,
            label: city.nameAr,
          }))
        );
      })
      .catch(() => {
        if (cityRequestIdRef.current !== requestId) return;
        setRequestError('تعذر تحميل المدن حالياً. يرجى إعادة المحاولة.');
      })
      .finally(() => {
        if (cityRequestIdRef.current !== requestId) return;
        setLoadingCities(false);
      });
  };

  const handleCitySelect = (option: DropdownOption) => {
    setSelectedCity(option);
    setFieldErrors((prev) => ({ ...prev, city: undefined }));
    setRequestError(null);
  };

  const submit = (): SubmitResult => {
    const country = selectedCountry;
    const city = selectedCity;
    const nextErrors: FieldErrors = {};

    if (!country) nextErrors.country = 'يرجى اختيار الدولة';
    if (!city) nextErrors.city = 'يرجى اختيار المدينة / المنطقة';

    if (!country || !city) {
      setFieldErrors(nextErrors);
      return { status: 'validation-error' };
    }

    setFieldErrors({});

    return {
      status: 'success',
      payload: {
        countryLabel: country.label,
        cityLabel: city.label,
        currencyNameAr: selectedCountryMeta?.currencyNameAr ?? null,
      },
    };
  };

  const cancel = () => {
    cityRequestIdRef.current += 1;
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedCountryMeta(null);
    setCityOptions([]);
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
