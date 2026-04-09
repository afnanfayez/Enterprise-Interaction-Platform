'use client';

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

  const handleSubmit = () => {
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
  };

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
