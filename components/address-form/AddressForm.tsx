'use client';

import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import {
  getMessages,
  type Locale,
} from '@/lib/i18n';
import AddressFormView from './AddressFormView';
import { useAddressForm } from './hooks/useAddressForm';

interface AddressFormProps {
  locale: Locale;
}

export default function AddressForm({ locale }: AddressFormProps) {
  const messages = getMessages(locale);

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
  } = useAddressForm({
    locale,
    messages: {
      countryRequired: messages.validation.countryRequired,
      cityRequired: messages.validation.cityRequired,
      countriesLoadFailed: messages.requestErrors.countriesLoadFailed,
      citiesLoadFailed: messages.requestErrors.citiesLoadFailed,
    },
  });

  const handleSubmit = useCallback(() => {
    const result = submit();

    if (result.status === 'validation-error') {
      toast.error(messages.validation.fillRequiredBeforeContinue);
      return;
    }

    const { countryLabel, cityLabel, currencyDisplay } = result.payload;
    const description = [
      `${messages.toast.countryLabel}: ${countryLabel}`,
      `${messages.toast.cityLabel}: ${cityLabel}`,
      currencyDisplay ? `${messages.toast.currencyLabel}: ${currencyDisplay}` : null,
    ]
      .filter(Boolean)
      .join(' • ');

    toast.success(messages.toast.successTitle, { description });
    cancel();
  }, [cancel, messages, submit]);

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
        if (target.closest('[data-no-submit-enter]')) return;
        if (target.id === 'cancel-btn') return;
        if (target.tagName === 'TEXTAREA') return;

        if (target.tagName === 'BUTTON' && target.id !== 'submit-btn') {
          return;
        }
      }

      event.preventDefault();
      handleSubmit();
    };

    window.addEventListener('keydown', onGlobalEnter, true);
    return () => window.removeEventListener('keydown', onGlobalEnter, true);
  }, [handleSubmit]);

  return (
    <AddressFormView
      locale={locale}
      messages={messages}
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
