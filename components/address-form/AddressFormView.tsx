'use client';

import type { Country } from '@/lib/api';
import Dropdown, { type DropdownOption } from './Dropdown';
import type { FieldErrors } from './hooks/useAddressForm';

interface AddressFormViewProps {
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg px-8 pt-8 pb-7 w-full max-w-[430px]">
        <div className="text-center mb-7">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1.5 tracking-tight">
            معلومات العنوان
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            يرجى اختيار بلدك والمنطقة/المدينة
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
          label="البلد"
          options={countryOptions}
          selected={selectedCountry}
          onSelect={onCountrySelect}
          placeholder="اختر البلد"
          loading={loadingCountries}
          error={fieldErrors.country}
        />

        <Dropdown
          id="city-dropdown"
          label="المنطقة / المدينة"
          options={cityOptions}
          selected={selectedCity}
          onSelect={onCitySelect}
          placeholder="اختر المنطقة / المدينة"
          disabled={!selectedCountry}
          loading={loadingCities}
          error={fieldErrors.city}
        />

        {selectedCountryMeta?.currencyNameAr && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg mb-4 text-sm text-emerald-800 animate-fade-in">
            <span>💱</span>
            <span>
              العملة: <strong>{selectedCountryMeta.currencyNameAr}</strong>
              {selectedCountryMeta.currency && (
                <span className="text-emerald-600 font-normal mr-1.5">
                  ({selectedCountryMeta.currency})
                </span>
              )}
            </span>
          </div>
        )}

        <p className="text-xs text-gray-400 mb-5">
          <span className="text-red-500">*</span> حقل إلزامي
        </p>

        <div className="flex items-center gap-3">
          <button
            id="submit-btn"
            type="button"
            onClick={onSubmit}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-lg font-bold text-base transition-all duration-150 cursor-pointer"
          >
            التالي
          </button>
          <button
            id="cancel-btn"
            type="button"
            onClick={onCancel}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium text-sm rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer flex-shrink-0"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
