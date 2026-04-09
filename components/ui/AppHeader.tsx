'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  type AppMessages,
  type Locale,
  isLocale,
} from '@/lib/i18n';

interface AppHeaderProps {
  locale: Locale;
  messages: AppMessages['header'];
}

function withLocaleInPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join('/')}`;
}

export default function AppHeader({ locale, messages }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale: Locale = locale === 'ar' ? 'en' : 'ar';

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    const nextPath = withLocaleInPath(pathname, nextLocale);
    const query = window.location.search;
    const href = query ? `${nextPath}${query}` : nextPath;

    void fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.push(href);
  };

  return (
    <header className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <h1 className="text-lg font-semibold text-slate-900">{messages.projectName}</h1>
      <button
        type="button"
        data-no-submit-enter
        aria-label={messages.languageSwitcherLabel}
        onClick={() => switchLocale(nextLocale)}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        {messages.switchButtonLabel}
      </button>
    </header>
  );
}
