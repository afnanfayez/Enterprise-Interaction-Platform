'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getMessages, type Locale } from '@/lib/i18n';
import { createOrderSchema, type CreateOrderInput } from '@/lib/validators';
import { getAccessToken } from '@/components/auth/AuthProvider';
import { useOrderLocation } from './hooks/useOrderLocation';
import type { DropdownOption } from '@/components/address-form/Dropdown';
import CreateOrderFormView from './CreateOrderFormView';

interface CreateOrderFormProps {
  locale: Locale;
}

export default function CreateOrderForm({ locale }: CreateOrderFormProps) {
  const messages = getMessages(locale);
  const router = useRouter();

  const [values, setValues] = useState<Partial<CreateOrderInput>>({
    quantity: 1,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateOrderInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLocationError = useCallback(
    (msg: string) => {
      toast.error(msg);
    },
    [],
  );

  const location = useOrderLocation({ locale, onError: handleLocationError });

  const handleFieldChange = useCallback(
    (field: keyof CreateOrderInput, value: string | number) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handleCountrySelect = useCallback(
    (option: DropdownOption) => {
      location.handleCountrySelect(option);
      handleFieldChange('countryIso2', option.value);
      // Clear city and currency when country changes
      setValues((prev) => ({ ...prev, city: '', currency: '' }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.countryIso2;
        delete next.city;
        delete next.currency;
        return next;
      });
    },
    [location, handleFieldChange],
  );

  const handleCitySelect = useCallback(
    (option: DropdownOption) => {
      location.handleCitySelect(option);
      handleFieldChange('city', option.value);
    },
    [location, handleFieldChange],
  );

  // Auto-set currency when country changes
  useEffect(() => {
    if (location.selectedCountryMeta?.currency) {
      setValues((prev) => ({
        ...prev,
        currency: location.selectedCountryMeta!.currency,
      }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.currency;
        return next;
      });
    }
  }, [location.selectedCountryMeta]);

  const handleSubmit = useCallback(async () => {
    const result = createOrderSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CreateOrderInput, string>> = {};
      const v = messages.validation;
      const fieldMessageMap: Record<string, string> = {
        orderType: v.orderTypeRequired,
        countryIso2: v.countryRequired,
        city: v.cityRequired,
        currency: v.currencyRequired,
        quantity: v.quantityRequired,
      };
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof CreateOrderInput;
        if (!fieldErrors[key]) {
          fieldErrors[key] = fieldMessageMap[key] ?? v.fillRequiredBeforeContinue;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(result.data),
      });

      const json = (await res.json()) as { data?: { id: string }; error?: string };

      if (!res.ok) {
        throw new Error(json.error ?? messages.errors.somethingWentWrong);
      }

      const orderId = json.data?.id;
      toast.success(messages.toast.orderCreated);
      router.push(`/${locale}/orders/${orderId}/confirmation`);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : messages.errors.somethingWentWrong,
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [values, locale, messages, router]);

  return (
    <CreateOrderFormView
      locale={locale}
      messages={messages}
      values={values}
      errors={errors}
      isSubmitting={isSubmitting}
      location={location}
      onFieldChange={handleFieldChange}
      onCountrySelect={handleCountrySelect}
      onCitySelect={handleCitySelect}
      onSubmit={handleSubmit}
    />
  );
}
