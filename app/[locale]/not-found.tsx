import Link from 'next/link';
import Image from 'next/image';
import { getMessages } from '@/lib/i18n';

export default function LocaleNotFound() {
  // Inside the [locale] segment we don't receive params directly,
  // so we show both languages like the root page.
  const ar = getMessages('ar').errors;
  const en = getMessages('en').errors;

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-dark-bg px-4">
      <div className="text-center">
        <Image
          src="/logo-dark.svg"
          alt="A3 Logo"
          width={48}
          height={48}
          className="mx-auto mb-8"
        />

        <p className="text-8xl font-bold text-brand-accent">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          {ar.notFoundTitle}
        </h1>
        <p className="mt-1 text-lg text-neutral-500 dark:text-neutral-400">{en.notFoundTitle}</p>

        <p className="mt-2 text-sm text-neutral-400">{ar.notFoundSubtitle}</p>
        <p className="text-sm text-neutral-400">{en.notFoundSubtitle}</p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-brand-accent px-6 py-2.5 text-sm font-medium text-brand-white transition-colors hover:bg-brand-accent-dark"
        >
          {ar.goHomeButton} / {en.goHomeButton}
        </Link>
      </div>
    </div>
  );
}
