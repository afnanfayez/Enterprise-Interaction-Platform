'use client';

import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import AddressFormView from './AddressFormView';
import { useAddressForm } from './hooks/useAddressForm';

export default function AddressForm() {
  const {
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
  } = useAddressForm();

  const handleSubmit = useCallback(() => {
    const result = submit();

    if (result.status === 'validation-error') {
      toast.error('يرجى إكمال الحقول المطلوبة قبل المتابعة.');
      return;
    }

    const { countryLabel, cityLabel, currencyNameAr } = result.payload;
    const description = [
      `الدولة: ${countryLabel}`,
      `المدينة: ${cityLabel}`,
      currencyNameAr ? `العملة: ${currencyNameAr}` : null,
    ]
      .filter(Boolean)
      .join(' • ');

    toast.success('تم الحفظ بنجاح!', { description });
  }, [submit]);

  useEffect(() => {
    const onGlobalEnter = (event: KeyboardEvent) => {
      if (
        event.key !== 'Enter' ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target.id === 'cancel-btn') return;
      }

      event.preventDefault();
      handleSubmit();
    };

    window.addEventListener('keydown', onGlobalEnter, true);
    return () => window.removeEventListener('keydown', onGlobalEnter, true);
  }, [handleSubmit]);

  return (
    <AddressFormView
      countryOptions={countryOptions}
      cityOptions={cityOptions}
      selectedCountry={selectedCountry}
      selectedCity={selectedCity}
      selectedCountryMeta={selectedCountryMeta}
      loadingCountries={loadingCountries}
      loadingCities={loadingCities}
      fieldErrors={fieldErrors}
      requestError={requestError}
      onCountrySelect={handleCountrySelect}
      onCitySelect={handleCitySelect}
      onSubmit={handleSubmit}
      onCancel={cancel}
    />
  );
}
