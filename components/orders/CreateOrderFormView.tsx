'use client';

import type { AppMessages, Locale } from '@/lib/i18n';
import type { CreateOrderInput } from '@/lib/validators';
import type { DropdownOption } from '@/components/address-form/Dropdown';
import Dropdown from '@/components/address-form/Dropdown';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface LocationData {
  countryOptions: DropdownOption[];
  cityOptions: DropdownOption[];
  selectedCountry: DropdownOption | null;
  selectedCity: DropdownOption | null;
  currencyDisplay: string | null;
  loadingCountries: boolean;
  loadingCities: boolean;
}

export interface CreateOrderFormViewProps {
  locale: Locale;
  messages: AppMessages;
  values: Partial<CreateOrderInput>;
  errors: Partial<Record<keyof CreateOrderInput, string>>;
  isSubmitting: boolean;
  location: LocationData;
  onFieldChange: (field: keyof CreateOrderInput, value: string | number) => void;
  onCountrySelect: (option: DropdownOption) => void;
  onCitySelect: (option: DropdownOption) => void;
  onSubmit: () => void;
}

const ORDER_TYPES = ['retail', 'wholesale', 'government', 'custom'] as const;

export default function CreateOrderFormView({
  messages,
  values,
  errors,
  isSubmitting,
  location,
  onFieldChange,
  onCountrySelect,
  onCitySelect,
  onSubmit,
}: CreateOrderFormViewProps) {
  const t = messages.orders;

  const dropdownTexts = {
    searchPlaceholder: messages.dropdown.searchPlaceholder,
    searchAriaPrefix: messages.dropdown.searchAriaPrefix,
    loadingText: messages.dropdown.loadingText,
    noResultsText: messages.dropdown.noResultsText,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {t.createOrderTitle}
      </h1>
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">{t.createOrderSubtitle}</p>

      <Card padding="lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-5"
        >
          {/* Order Type */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="orderType"
              className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {t.orderTypeLabel}
              <span className="ms-0.5 text-brand-danger" aria-hidden="true">
                *
              </span>
            </label>
            <select
              id="orderType"
              value={values.orderType ?? ''}
              onChange={(e) => onFieldChange('orderType', e.target.value)}
              aria-invalid={errors.orderType ? true : undefined}
              className={[
                'h-[46px] rounded-lg border px-4 text-sm outline-none transition-shadow bg-white text-neutral-900 dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100',
                errors.orderType
                  ? 'border-brand-danger focus:shadow-focus-danger'
                  : 'border-neutral-300 focus:border-brand-accent focus:shadow-focus-accent',
              ].join(' ')}
            >
              <option value="" disabled>
                —
              </option>
              {ORDER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t.orderTypes[type]}
                </option>
              ))}
            </select>
            {errors.orderType && (
              <p role="alert" className="text-xs text-brand-danger">
                {errors.orderType}
              </p>
            )}
          </div>

          {/* Country Dropdown */}
          <Dropdown
            id="order-country"
            label={messages.form.countryLabel}
            options={location.countryOptions}
            selected={location.selectedCountry}
            onSelect={onCountrySelect}
            placeholder={messages.form.countryPlaceholder}
            loading={location.loadingCountries}
            error={errors.countryIso2}
            texts={dropdownTexts}
          />

          {/* City Dropdown */}
          <Dropdown
            id="order-city"
            label={messages.form.cityLabel}
            options={location.cityOptions}
            selected={location.selectedCity}
            onSelect={onCitySelect}
            placeholder={messages.form.cityPlaceholder}
            disabled={!location.selectedCountry}
            loading={location.loadingCities}
            error={errors.city}
            texts={dropdownTexts}
          />

          {/* Currency (auto-filled, read-only display) */}
          {location.currencyDisplay && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 animate-fade-in dark:bg-emerald-900/20 dark:border-emerald-700/30 dark:text-emerald-300">
              <span>💱</span>
              <span>
                {messages.form.currencyLabel}: <strong>{location.currencyDisplay}</strong>
              </span>
            </div>
          )}

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {t.descriptionLabel}
            </label>
            <textarea
              id="description"
              rows={3}
              value={values.description ?? ''}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder={t.descriptionPlaceholder}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow focus:border-brand-accent focus:shadow-focus-accent dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100 dark:focus:border-brand-accent"
            />
          </div>

          {/* Quantity */}
          <Input
            label={t.quantityLabel}
            required
            type="number"
            min={1}
            value={values.quantity ?? 1}
            onChange={(e) =>
              onFieldChange('quantity', parseInt(e.target.value, 10) || 1)
            }
            error={errors.quantity}
          />

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="notes"
              className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {t.notesLabel}
            </label>
            <textarea
              id="notes"
              rows={3}
              value={values.notes ?? ''}
              onChange={(e) => onFieldChange('notes', e.target.value)}
              placeholder={t.notesPlaceholder}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-shadow focus:border-brand-accent focus:shadow-focus-accent dark:border-neutral-600 dark:bg-dark-surface dark:text-neutral-100 dark:focus:border-brand-accent"
            />
          </div>

          <Button type="submit" loading={isSubmitting} fullWidth size="lg">
            {t.submitOrderButton}
          </Button>
        </form>
      </Card>
    </div>
  );
}
