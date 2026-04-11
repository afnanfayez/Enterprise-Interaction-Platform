'use client';

import type { SyntheticEvent } from 'react';
import type { Country } from '@/lib/api';
import type { AppMessages, Locale } from '@/lib/i18n';
import AppHeader from '@/components/ui/AppHeader';
import Dropdown, { type DropdownOption } from './Dropdown';
import type { FieldErrors } from './hooks/useAddressForm';

interface AddressFormViewProps {
  locale: Locale;
  messages: AppMessages;
  countryOptions: DropdownOption[];
  cityOptions: DropdownOption[];
  selectedCountry: DropdownOption | null;
  selectedCity: DropdownOption | null;
  selectedCountryMeta: Country | null;
  loadingCountries: boolean;
  loadingCities: boolean;
  fieldErrors: FieldErrors;
  requestError: string | null;
  onCountrySelect: (option: DropdownOption) => void;
  onCitySelect: (option: DropdownOption) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function AddressFormView({
  locale,
  messages,
  countryOptions,
  cityOptions,
  selectedCountry,
  selectedCity,
  selectedCountryMeta,
  loadingCountries,
  loadingCities,
  fieldErrors,
  requestError,
  onCountrySelect,
  onCitySelect,
  onSubmit,
  onCancel,
}: AddressFormViewProps) {
  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    onSubmit();
  };

  const currencyDisplay =
    locale === 'ar'
      ? selectedCountryMeta?.currencyNameAr || selectedCountryMeta?.currency
      : selectedCountryMeta?.currency;

  const dropdownTexts = {
    searchPlaceholder: messages.dropdown.searchPlaceholder,
    searchAriaPrefix: messages.dropdown.searchAriaPrefix,
    loadingText: messages.dropdown.loadingText,
    noResultsText: messages.dropdown.noResultsText,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-brand-accent-light flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[430px]">
        <AppHeader locale={locale} messages={messages.header} />

        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-2xl shadow-lg px-8 pt-8 pb-7 w-full"
        >
          <div className="text-center mb-7">
            <h2 className="text-[22px] font-bold text-gray-900 mb-1.5 tracking-tight">
              {messages.form.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {messages.form.subtitle}
            </p>
          </div>

          {requestError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {requestError}
            </div>
          )}

          <Dropdown
            id="country-dropdown"
            label={messages.form.countryLabel}
            options={countryOptions}
            selected={selectedCountry}
            onSelect={onCountrySelect}
            placeholder={messages.form.countryPlaceholder}
            loading={loadingCountries}
            error={fieldErrors.country}
            texts={dropdownTexts}
          />

          <Dropdown
            id="city-dropdown"
            label={messages.form.cityLabel}
            options={cityOptions}
            selected={selectedCity}
            onSelect={onCitySelect}
            placeholder={messages.form.cityPlaceholder}
            disabled={!selectedCountry}
            loading={loadingCities}
            error={fieldErrors.city}
            texts={dropdownTexts}
          />

          {currencyDisplay && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg mb-4 text-sm text-emerald-800 animate-fade-in">
              <span>💱</span>
              <span>
                {messages.form.currencyLabel}: <strong>{currencyDisplay}</strong>
              </span>
            </div>
          )}

          <p className="text-xs text-gray-400 mb-5">
            <span className="text-red-500">*</span> {messages.form.requiredHint}
          </p>

          <div className="flex items-center gap-3">
            <button
              id="submit-btn"
              type="submit"
              className="flex-1 h-12 bg-brand-accent hover:bg-brand-accent-dark active:scale-[0.98] text-white rounded-lg font-bold text-base transition-all duration-150 cursor-pointer"
            >
              {messages.form.submitButton}
            </button>
            <button
              id="cancel-btn"
              type="button"
              onClick={onCancel}
              className="text-brand-accent hover:text-brand-accent-dark hover:bg-brand-accent-light font-medium text-sm rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer flex-shrink-0"
            >
              {messages.form.cancelButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
