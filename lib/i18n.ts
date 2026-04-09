export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ar';
export const LOCALE_COOKIE_NAME = 'adel-locale';

export type Direction = 'rtl' | 'ltr';

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ar' || value === 'en';
}

export function getLocaleDirection(locale: Locale): Direction {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function detectPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;
  return /\ben\b/i.test(acceptLanguageHeader) ? 'en' : 'ar';
}

export interface AppMessages {
  header: {
    projectName: string;
    languageSwitcherLabel: string;
    switchButtonLabel: string;
  };
  form: {
    title: string;
    subtitle: string;
    countryLabel: string;
    cityLabel: string;
    countryPlaceholder: string;
    cityPlaceholder: string;
    requiredHint: string;
    submitButton: string;
    cancelButton: string;
    currencyLabel: string;
  };
  dropdown: {
    searchPlaceholder: string;
    searchAriaPrefix: string;
    loadingText: string;
    noResultsText: string;
  };
  validation: {
    countryRequired: string;
    cityRequired: string;
    fillRequiredBeforeContinue: string;
  };
  requestErrors: {
    countriesLoadFailed: string;
    citiesLoadFailed: string;
  };
  toast: {
    successTitle: string;
    countryLabel: string;
    cityLabel: string;
    currencyLabel: string;
  };
}

const MESSAGES: Record<Locale, AppMessages> = {
  ar: {
    header: {
      projectName: 'Test UI',
      languageSwitcherLabel: 'تبديل اللغة',
      switchButtonLabel: 'EN',
    },
    form: {
      title: 'معلومات العنوان',
      subtitle: 'يرجى اختيار بلدك والمنطقة/المدينة',
      countryLabel: 'البلد',
      cityLabel: 'المنطقة / المدينة',
      countryPlaceholder: 'اختر البلد',
      cityPlaceholder: 'اختر المنطقة / المدينة',
      requiredHint: 'حقل إلزامي',
      submitButton: 'التالي',
      cancelButton: 'إلغاء',
      currencyLabel: 'العملة',
    },
    dropdown: {
      searchPlaceholder: 'بحث...',
      searchAriaPrefix: 'بحث في',
      loadingText: 'جاري التحميل...',
      noResultsText: 'لا توجد نتائج',
    },
    validation: {
      countryRequired: 'يرجى اختيار الدولة',
      cityRequired: 'يرجى اختيار المدينة / المنطقة',
      fillRequiredBeforeContinue: 'يرجى إكمال الحقول المطلوبة قبل المتابعة.',
    },
    requestErrors: {
      countriesLoadFailed: 'تعذر تحميل قائمة الدول. يرجى المحاولة مرة أخرى.',
      citiesLoadFailed: 'تعذر تحميل المدن حالياً. يرجى إعادة المحاولة.',
    },
    toast: {
      successTitle: 'تم الحفظ بنجاح!',
      countryLabel: 'الدولة',
      cityLabel: 'المدينة',
      currencyLabel: 'العملة',
    },
  },
  en: {
    header: {
      projectName: 'Test UI',
      languageSwitcherLabel: 'Switch language',
      switchButtonLabel: 'AR',
    },
    form: {
      title: 'Address Information',
      subtitle: 'Please select your country and city/region',
      countryLabel: 'Country',
      cityLabel: 'City / Region',
      countryPlaceholder: 'Select country',
      cityPlaceholder: 'Select city / region',
      requiredHint: 'Required field',
      submitButton: 'Next',
      cancelButton: 'Cancel',
      currencyLabel: 'Currency',
    },
    dropdown: {
      searchPlaceholder: 'Search...',
      searchAriaPrefix: 'Search in',
      loadingText: 'Loading...',
      noResultsText: 'No results found',
    },
    validation: {
      countryRequired: 'Please select a country',
      cityRequired: 'Please select a city / region',
      fillRequiredBeforeContinue: 'Please complete the required fields before continuing.',
    },
    requestErrors: {
      countriesLoadFailed: 'Unable to load countries. Please try again.',
      citiesLoadFailed: 'Unable to load cities right now. Please try again.',
    },
    toast: {
      successTitle: 'Saved successfully!',
      countryLabel: 'Country',
      cityLabel: 'City',
      currencyLabel: 'Currency',
    },
  },
};

export function getMessages(locale: Locale): AppMessages {
  return MESSAGES[locale];
}
