'use client';

import { useState, useEffect } from 'react';
import Dropdown, { type DropdownOption } from './Dropdown';
import { fetchCountries, fetchCities, type Country } from '@/lib/api';

export default function AddressForm() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [countryOptions, setCountryOptions] = useState<DropdownOption[]>([]);
  const [cityOptions, setCityOptions] = useState<DropdownOption[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<DropdownOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<DropdownOption | null>(null);
  const [selectedCountryMeta, setSelectedCountryMeta] = useState<Country | null>(null);

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCountries()
      .then((countries) => {
        setAllCountries(countries);
        setCountryOptions(
          countries.map((c) => ({
            value: c.iso2,
            label: c.nameAr,       
            flagUrl: c.flag,
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoadingCountries(false));
  }, []);

  const handleCountrySelect = (option: DropdownOption) => {
    const meta = allCountries.find((c) => c.iso2 === option.value) ?? null;

    setSelectedCountry(option);
    setSelectedCountryMeta(meta);
    setSelectedCity(null);
    setCityOptions([]);
    setErrors((prev) => ({ ...prev, country: '' }));

    if (!meta) return;

    setLoadingCities(true);
    fetchCities(meta.nameEn, meta.iso2)
      .then((cities) =>
        setCityOptions(
          cities.map((c) => ({
            value: c.nameEn,   
            label: c.nameAr,  
          }))
        )
      )
      .catch(console.error)
      .finally(() => setLoadingCities(false));
  };

  const handleCitySelect = (option: DropdownOption) => {
    setSelectedCity(option);
    setErrors((prev) => ({ ...prev, city: '' }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedCountry) newErrors.country = 'يرجى اختيار الدولة';
    if (!selectedCity) newErrors.city = 'يرجى اختيار المدينة / المنطقة';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    alert(
      `✅ تم الحفظ بنجاح!\n\nالدولة: ${selectedCountry?.label}\nالمدينة: ${selectedCity?.label}\nالعملة: ${selectedCountryMeta?.currencyNameAr}`
    );
  };

  const handleCancel = () => {
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedCountryMeta(null);
    setCityOptions([]);
    setErrors({});
  };

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

        <Dropdown
          id="country-dropdown"
          label="البلد"
          options={countryOptions}
          selected={selectedCountry}
          onSelect={handleCountrySelect}
          placeholder="اختر البلد"
          loading={loadingCountries}
          error={errors.country}
        />

        <Dropdown
          id="city-dropdown"
          label="المنطقة / المدينة"
          options={cityOptions}
          selected={selectedCity}
          onSelect={handleCitySelect}
          placeholder="اختر المنطقة / المدينة"
          disabled={!selectedCountry}
          loading={loadingCities}
          error={errors.city}
        />

        {selectedCountryMeta?.currencyNameAr && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg mb-4 text-sm text-emerald-800 animate-fade-in">
            <span>💱</span>
            <span>
              العملة:{' '}
              <strong>{selectedCountryMeta.currencyNameAr}</strong>
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
            onClick={handleSubmit}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-lg font-bold text-base transition-all duration-150 cursor-pointer"
          >
            التالي
          </button>
          <button
            id="cancel-btn"
            type="button"
            onClick={handleCancel}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium text-sm rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer flex-shrink-0"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
}
