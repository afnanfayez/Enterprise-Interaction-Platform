'use client';

import { useEffect } from 'react';
import { getLocaleDirection, type Locale } from '@/lib/i18n';

interface DocumentLocaleSyncProps {
  locale: Locale;
}

export default function DocumentLocaleSync({ locale }: DocumentLocaleSyncProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = getLocaleDirection(locale);
  }, [locale]);

  return null;
}
