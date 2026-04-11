'use client';

import { usePathname } from 'next/navigation';
import AppNavigation from '@/components/ui/AppNavigation';
import type { AppMessages, Locale } from '@/lib/i18n';

interface NavigationWrapperProps {
  locale: Locale;
  messages: AppMessages;
}

const HIDDEN_SEGMENTS = ['login', 'register', 'admin'];

export default function NavigationWrapper({
  locale,
  messages,
}: NavigationWrapperProps) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  // segments[0] is locale, segments[1] is the first route segment
  const firstSegment = segments[1] ?? '';

  if (HIDDEN_SEGMENTS.includes(firstSegment)) {
    return null;
  }

  return <AppNavigation locale={locale} messages={messages} />;
}
